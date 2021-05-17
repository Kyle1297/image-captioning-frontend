import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import CaptionImageDialog from '../dialogs/captionImageDialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
	Button,
	MenuItem,
	Typography,
	useMediaQuery,
	withStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { AuthState } from '../../../store/types/auth';

interface Props {
	setAnchorEl?: Dispatch<SetStateAction<null | HTMLElement>>;
}

const CaptionButton: React.FC<Props> = ({ setAnchorEl }) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 500px)');

	// control opening of image upload form
	const [open, setOpen] = useState<boolean>(false);
	const handleDialog = () => {
		if (setAnchorEl) setAnchorEl(null);
		setOpen(!open);
	};

	// retrieve user authentication
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);

	return (
		<Fragment>
			{smallScreen ? (
				<StyledMenuItem
					style={isAuthenticated ? {} : { justifyContent: 'center' }}
					onClick={handleDialog}
				>
					<Typography className={styles.content}>Upload & Caption</Typography>
				</StyledMenuItem>
			) : (
				<Button className={styles.button} onClick={handleDialog}>
					Upload & Caption
				</Button>
			)}
			<CaptionImageDialog open={open} handleDialog={handleDialog} />
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
			fontSize: 15,
			marginRight: -5,
		},
		content: {
			marginLeft: 7,
		},
	})
);

const StyledMenuItem = withStyles({
	root: {
		'&:hover': {
			backgroundColor: 'lightgray',
		},
	},
})(MenuItem);

export default CaptionButton;
