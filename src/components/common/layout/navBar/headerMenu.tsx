import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
	CircularProgress,
	createStyles,
	Grid,
	IconButton,
	makeStyles,
	Theme,
	useMediaQuery,
	withStyles,
} from '@material-ui/core';
import { MenuSharp } from '@material-ui/icons';
import LoginButtons from '../../buttons/loginButtons';
import CaptionButton from '../../buttons/captionButton';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducers';
import { AuthState } from '../../../../store/types/auth';
import UserAvatar, { UserTypes } from '../userAvatar';
import { namedRequestsInProgress } from '../../../../store/selectors/request';
import { Request, RequestEnums } from '../../../../store/types/request';
import RedirectMenuItem from '../../menu/redirectMenuItem';

interface Props {
	account?: boolean;
}

const HeaderMenu: React.FC<Props> = ({ account }) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 500px');

	// handle menu positioning
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClose = () => setAnchorEl(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	// retrieve user authentication
	const { isAuthenticated, user } = useSelector<AppState, AuthState>(
		(state) => state.auth
	);

	// detect when logout request is occurring
	const logoutIsLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.logoutUser)
	);

	return (
		<Grid item>
			{logoutIsLoading && account ? (
				<div className={styles.loading}>
					<CircularProgress size={28} />
				</div>
			) : (
				<IconButton
					size='small'
					className={styles.button}
					onClick={handleClick}
				>
					{account ? (
						<UserAvatar noLink user={user} userType={UserTypes.USER_SMALL} />
					) : (
						<MenuSharp className={styles.menuIcon} />
					)}
				</IconButton>
			)}
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				marginThreshold={0}
				disableScrollLock
				getContentAnchorEl={null}
				PaperProps={
					smallScreen
						? {
								style: {
									width: '100%',
									maxWidth: '100%',
									left: 0,
									right: 0,
									marginTop: 51,
									background: '#eeeeee',
								},
						  }
						: { style: { background: '#eeeeee', marginTop: 52, width: 225 } }
				}
			>
				{account ? (
					user ? (
						<div>
							<RedirectMenuItem
								url={`/users/${user.username}`}
								label='View profile'
								setAnchorEl={setAnchorEl}
							/>
							<RedirectMenuItem
								url='/account'
								label='Account settings'
								setAnchorEl={setAnchorEl}
							/>
							<LoginButtons />
						</div>
					) : (
						''
					)
				) : (
					<div>
						{isAuthenticated ? (
							''
						) : (
							<StyledMenuItem disableRipple onClick={handleClose}>
								<LoginButtons />
							</StyledMenuItem>
						)}
						<CaptionButton />
						<RedirectMenuItem
							url='/explore'
							label='Explore'
							setAnchorEl={setAnchorEl}
							center={!isAuthenticated}
						/>
					</div>
				)}
			</Menu>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		menuIcon: {
			fontSize: 32,
		},
		button: {
			marginRight: 5,
		},
		loading: {
			marginTop: 5,
			marginRight: 15,
			paddingLeft: 21,
		},
	})
);

const StyledMenuItem = withStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
})(MenuItem);

export default HeaderMenu;
