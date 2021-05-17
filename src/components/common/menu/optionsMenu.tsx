import React, { Fragment, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	useMediaQuery,
	withStyles,
} from '@material-ui/core';
import { Flag, Info, MoreVert, Person } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import ReportDialog from '../dialogs/reportDialog';
import { Comment } from '../../../store/types/comment';
import { Image } from '../../../store/types/image';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, User } from '../../../store/types/auth';
import { AppState } from '../../../store/reducers';
import { setAlert } from '../../../store/actions/alert';
import { SeverityTypes } from '../../../store/types/alert';
import { TabNumbers } from '../../../store/types/login';
import { setLogin } from '../../../store/actions/login';
import ImageInfoDialog from '../../pages/imageDetails/sideImageContents/imageInfo/imageInfoDialog';
import { Link } from 'react-router-dom';

interface Props {
	commentId?: Comment['id'];
	uuid?: Image['uuid'];
	username?: User['username'];
}

const OptionsMenu: React.FC<Props> = ({ commentId, uuid, username }) => {
	// retrieve styles and dispatch
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px');
	const dispatch = useDispatch();

	// handle menu positioning
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleMenuClose = () => setAnchorEl(null);
	const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	// open reporting dialog
	const [openReport, setOpenReport] = useState<boolean>(false);
	const handleReportClick = (event: React.MouseEvent<HTMLLIElement>) => {
		event.preventDefault();
		setAnchorEl(null);
		if (user) setOpenReport(true);
		else {
			// alert need for authentication
			dispatch(
				setAlert({
					severity: SeverityTypes.WARNING,
					message: `You need to be logged in to report the ${
						uuid ? 'image' : 'comment'
					}.`,
					open: true,
					loading: null,
				})
			);
			dispatch(
				setLogin({
					tab: TabNumbers.LOGIN,
					open: true,
				})
			);
		}
	};

	// remove link
	const handleNoLink = (event: React.MouseEvent<HTMLAnchorElement>) =>
		event.preventDefault();

	// open info dialog
	const [openInfo, setOpenInfo] = useState<boolean>(false);
	const handleInfoClick = (event: React.MouseEvent<HTMLLIElement>) => {
		event.preventDefault();
		setAnchorEl(null);
		setOpenInfo(true);
	};

	// retrieve current user
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	return (
		<Fragment>
			<Grid item>
				<IconButton
					edge='end'
					style={{ width: 10 }}
					size='small'
					onClick={handleOptionsClick}
				>
					<MoreVert className={styles.optionsIcon} />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					disableScrollLock
					getContentAnchorEl={null}
					anchorOrigin={{
						vertical: username ? 'center' : 'bottom',
						horizontal: username ? 'left' : 'right',
					}}
					transformOrigin={{
						vertical: username ? 'bottom' : 'top',
						horizontal: 'right',
					}}
				>
					<Link
						to={`/users/${username}`}
						onClick={username ? undefined : handleNoLink}
						className={styles.link}
					>
						<StyledMenuItem
							dense
							onClick={username ? undefined : handleReportClick}
						>
							{username ? (
								<Person className={styles.menuIcon} color='action' />
							) : (
								<Flag className={styles.menuIcon} color='action' />
							)}
							<Typography className={styles.menuText} variant='body2'>
								{username ? 'View profile' : 'Report'}
							</Typography>
						</StyledMenuItem>
					</Link>

					{smallScreen && uuid && !username ? (
						<StyledMenuItem dense onClick={handleInfoClick}>
							<Info className={styles.menuIcon} color='action' />
							<Typography className={styles.menuText} variant='body2'>
								Info
							</Typography>
						</StyledMenuItem>
					) : (
						''
					)}
				</Menu>
			</Grid>
			<ReportDialog
				open={openReport}
				setOpen={setOpenReport}
				commentId={commentId}
				uuid={uuid}
			/>
			{smallScreen ? (
				<ImageInfoDialog open={openInfo} setOpen={setOpenInfo} />
			) : (
				''
			)}
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		optionsIcon: {
			fontSize: 20,
		},
		menuIcon: {
			fontSize: 21,
		},
		comment: {
			wordBreak: 'break-word',
		},
		menuText: {
			marginLeft: 18,
			marginRight: 20,
			marginBottom: 1,
		},
		link: {
			color: 'black',
			textDecoration: 'none',
		},
	})
);

const StyledMenuItem = withStyles({
	root: {
		'&:hover': {
			backgroundColor: grey[300],
		},
	},
})(MenuItem);

export default OptionsMenu;
