import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ImageState } from '../../../store/types/image';
import { AppState } from '../../../store/reducers';
import { AuthState } from '../../../store/types/auth';
import { setAlert } from '../../../store/actions/alert';
import { SeverityTypes } from '../../../store/types/alert';
import { TabNumbers } from '../../../store/types/login';
import { setLogin } from '../../../store/actions/login';
import { FaRegComment, FaComment } from 'react-icons/fa';
import { useHistory } from 'react-router';

interface Props {
	uuid: Image['uuid'];
}

const CommentButton: React.FC<Props> = ({ uuid }) => {
	// access styles and dispatch/history
	const styles = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	// retrieve user authentication and image
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);
	const image = useSelector<AppState, ImageState['image']>((state) =>
		state.images.images.find((image) => image.uuid === uuid)
	);

	// handle hovering over button and whether button was clicked
	const [hovering, setHovering] = useState<boolean>(false);
	const handleEnterHover = (event: React.MouseEvent<HTMLButtonElement>) =>
		setHovering(true);
	const handleExitHover = (event: React.MouseEvent<HTMLButtonElement>) =>
		setHovering(false);

	// handle button click
	const handleComments = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (isAuthenticated) history.push('/images/explore');
		else {
			// alert need for authentication
			dispatch(
				setAlert({
					severity: SeverityTypes.WARNING,
					message: 'You need to be logged in to comment on an image.',
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

	return image ? (
		<Grid item>
			<Grid container justify='center' alignItems='center'>
				<IconButton
					onMouseEnter={handleEnterHover}
					onMouseLeave={handleExitHover}
					onClick={handleComments}
					className={styles.button}
				>
					{hovering ? (
						<FaComment className={styles.icon} />
					) : (
						<FaRegComment className={styles.icon} />
					)}
				</IconButton>
				<Typography className={styles.text}>
					{image.comments_count < 100 ? image.comments_count : '99+'}
				</Typography>
			</Grid>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			color: 'white',
			padding: 6,
		},
		icon: {
			fontSize: 18,
		},
		text: {
			marginLeft: 5,
		},
	})
);

export default CommentButton;
