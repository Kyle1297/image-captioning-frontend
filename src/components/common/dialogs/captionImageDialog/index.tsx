import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	useMediaQuery,
} from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import ImageInput from './imageInput';
import CollectionsAutocomplete from '../../collections/collectionsAutocomplete';
import { ImagePost } from '../../../../store/types/image';
import { AuthState } from '../../../../store/types/auth';
import { AppState } from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import extractFilename from '../../../utils/extractFilename';
import { uploadImage } from '../../../../store/actions/image';
import { SeverityTypes } from '../../../../store/types/alert';
import { setAlert } from '../../../../store/actions/alert';
import CaptionGeneratedDialog from './captionGeneratedDialog';
import RadioOptions from '../../buttons/radioOptions';

interface Props {
	open: boolean;
	handleDialog: () => void;
}

const CaptionImageDialog: React.FC<Props> = ({ open, handleDialog }) => {
	// check whether a fullscreen dialog is more appropriate for screensize
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// retrieve user
	const { isAuthenticated, user } = useSelector<AppState, AuthState>(
		(state) => state.auth
	);

	// access styles and control form inputs
	const styles = useStyles();
	const [image, setImage] = useState<ImagePost>({
		uuid: uuidv4(),
		uploader: null,
		title: '',
		image: null,
		is_private: false,
		is_profile_image: false,
		collection_ids: [],
		width: 0,
		height: 0,
		caption: { text: '' },
		type: '',
	});

	// handle image title's value
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		let title = event.currentTarget.value;
		setImage({
			...image,
			title: title,
		});
	};

	// add current user
	useEffect(() => {
		if (user)
			setImage({
				...image,
				uploader: user?.id ? { id: user.id } : null,
			});
	}, [user]); // eslint-disable-line react-hooks/exhaustive-deps

	// handle caption processing
	const [captionError, setCaptionError] = useState<string>('');
	const [captionClicked, setCaptionClicked] = useState<boolean>(false);
	const handleCaption = () => {
		if (!image.image) {
			setCaptionError("Hmm... it seems like you've forgotten to add an image.");
		} else if (!captionError) {
			if (!image.title)
				setImage({
					...image,
					title: extractFilename(image.image.name),
				});
			setCaptionClicked(true);
		}
	};

	// upload image
	const dispatch = useDispatch();
	useEffect(() => {
		if (captionClicked && image.title) {
			dispatch(uploadImage(image));
			handleDialog();
			dispatch(
				setAlert({
					severity: SeverityTypes.INFO,
					message: 'Generating your caption...',
					open: true,
					loading: true,
				})
			);
		}
	}, [captionClicked, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Fragment>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				fullWidth
				onClose={handleDialog}
				className={styles.dialog}
				disableScrollLock
			>
				<DialogTitle className={styles.title}>
					Upload and caption your image
				</DialogTitle>
				<DialogContent>
					<RadioOptions
						value={image}
						setImage={setImage}
						options={[
							{
								value: false,
								label: 'Public',
							},
							{
								value: true,
								label: 'Private',
								disabled: isAuthenticated ? false : true,
							},
						]}
					/>
					<TextField
						size='small'
						style={fullScreen ? { width: '100%' } : { width: '80%' }}
						className={styles.text}
						variant='outlined'
						label='Name'
						helperText="If empty, the image's filename will be used."
						onChange={handleTitleChange}
						value={image.title}
					/>
					<CollectionsAutocomplete image={image} setImage={setImage} />
					<ImageInput
						image={image}
						setImage={setImage}
						captionError={captionError}
						setCaptionError={setCaptionError}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialog} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleCaption} color='primary'>
						Caption
					</Button>
				</DialogActions>
			</Dialog>
			{captionClicked ? (
				<CaptionGeneratedDialog
					setImage={setImage}
					setCaptionClicked={setCaptionClicked}
					imagePost={image}
				/>
			) : (
				''
			)}
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialog: {
			display: 'block',
			textAlign: 'center',
			margin: 'auto',
		},
		title: {
			marginTop: 10,
		},
		text: {
			marginTop: 20,
			marginBottom: 30,
			[`& fieldset`]: {
				borderRadius: 25,
			},
		},
	})
);

export default CaptionImageDialog;
