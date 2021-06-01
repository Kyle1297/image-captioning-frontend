import React, { Fragment, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { AppState } from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../../../store/types/auth';
import UserAvatar, { UserTypes } from '../../../common/layout/userAvatar';
import { SeverityTypes } from '../../../../store/types/alert';
import { setAlert } from '../../../../store/actions/alert';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '../../../../store/actions/image';
import extractFilename from '../../../utils/extractFilename';
import { Request, RequestEnums } from '../../../../store/types/request';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../../store/selectors/request';
import { green } from '@material-ui/core/colors';

const EditImage: React.FC = () => {
	// access styles
	const styles = useStyles();

	// retrieve user
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	// detect image states
	const isUploading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, [
			RequestEnums.uploadImage,
			RequestEnums.createImage,
		])
	);
	const createError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.createImage)
	);
	const uploadError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.uploadImage)
	);

	// handle errors
	const dispatch = useDispatch();
	useEffect(() => {
		// set error message
		let message = '';
		if (uploadError)
			message = 'Failed to upload image. Please try again later.';
		else if (createError)
			message = 'Failed to create new image. Please try again later.';

		// alert user of error
		if (message) {
			dispatch(
				setAlert({
					severity: SeverityTypes.ERROR,
					message: message,
					open: true,
					loading: false,
				})
			);
		}
	}, [dispatch, uploadError, createError]);

	// control how an image is handled once uploaded
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		let files = event.target.files;
		if (files && files[0]) {
			// set new image and its dimensions
			let newImage = files[0];
			let imageError = false;
			if (newImage.type.split('/')[0] === 'image') {
				let img = new Image();
				img.src = window.URL.createObjectURL(newImage);
				img.onload = () => {
					// set uploaded file
					const imageType = newImage.type.split('/')[1];
					dispatch(
						uploadImage({
							uuid: uuidv4(),
							uploader: user?.id ? { id: user.id } : null,
							title: extractFilename(newImage.name),
							image: newImage,
							is_private: true,
							is_profile_image: true,
							height: img.height,
							width: img.width,
							type: imageType,
						})
					);

					// check for valid image
					if (newImage.type.split('/')[0] !== 'image') imageError = true;
				};
			} else imageError = true;

			// alert if file is not an image
			if (imageError) {
				dispatch(
					setAlert({
						severity: SeverityTypes.ERROR,
						message: 'Only image files are accepted. Please try again.',
						open: true,
						loading: false,
					})
				);
			}
		}
	};

	// ensure all uploaded files are detected, even if same file is uploaded twice
	const handleInputClick = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		(event.target as HTMLInputElement).value = '';
	};

	return user ? (
		<Fragment>
			<input
				className={styles.input}
				id='profile-input'
				type='file'
				accept='image/*'
				required
				onChange={handleImageUpload}
				onClick={handleInputClick}
			/>
			<label htmlFor='profile-input'>
				<Grid
					container
					justify='center'
					direction='column'
					alignItems='center'
					spacing={2}
				>
					<Grid item className={styles.wrapper}>
						<Fragment>
							<IconButton component='span' size='small'>
								<UserAvatar
									user={user}
									noLink
									userType={UserTypes.USER_LARGE}
								/>
							</IconButton>
							{isUploading ? (
								<CircularProgress
									thickness={1.9}
									size={140}
									className={styles.uploading}
								/>
							) : (
								''
							)}
						</Fragment>
					</Grid>
					<Grid item>
						{isUploading ? (
							<Typography color='textSecondary' variant='body2'>
								Uploading...
							</Typography>
						) : (
							<Button
								component='span'
								size='small'
								variant='outlined'
								className={styles.button}
							>
								<Typography color='textSecondary' variant='body2'>
									Change profile picture
								</Typography>
							</Button>
						)}
					</Grid>
				</Grid>
			</label>
		</Fragment>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			display: 'none',
		},
		button: {
			textTransform: 'none',
		},
		uploading: {
			color: green[400],
			position: 'absolute',
			left: 9,
			zIndex: 1,
		},
		wrapper: {
			margin: theme.spacing(1),
			position: 'relative',
		},
	})
);

export default EditImage;
