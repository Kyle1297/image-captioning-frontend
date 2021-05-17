import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	useMediaQuery,
	Typography,
} from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import { ImagePost, ImageState } from '../../../../../store/types/image';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { Request, RequestEnums } from '../../../../../store/types/request';
import { setAlert } from '../../../../../store/actions/alert';
import { SeverityTypes } from '../../../../../store/types/alert';
import { v4 as uuidv4 } from 'uuid';
import { createImage } from '../../../../../store/actions/image';
import { setCollection } from '../../../../../store/actions/collection';
import { AppState } from '../../../../../store/reducers';
import { namedRequestError } from '../../../../../store/selectors/request';
import RatingButton, { RatingButtons } from './ratingButton';
import CaptionTextField from './captionTextField';
import { setCaption } from '../../../../../store/actions/caption';

interface Props {
	setImage: Dispatch<SetStateAction<ImagePost>>;
	setCaptionClicked: Dispatch<SetStateAction<boolean>>;
	imagePost: ImagePost;
}

const CaptionGeneratedDialog: React.FC<Props> = ({
	setImage,
	imagePost,
	setCaptionClicked,
}) => {
	// check whether a fullscreen dialog is more appropriate for screensize
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// retrieve image states
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);
	const createError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.createImage)
	);
	const uploadError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.uploadImage)
	);

	// control opening of dialog
	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const handleDialog = useCallback(() => {
		setOpen(false);
		setImage({
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
		dispatch(setCollection(null));
		dispatch(setCaption(null));
		setCaptionClicked(false);
	}, [setCaptionClicked, setImage, dispatch]);

	// handle errors
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
			handleDialog();
		}
	}, [dispatch, handleDialog, uploadError, createError]);

	// handle failure to connect to websocket
	const reconnectAttemptLimit = 5;
	const handleReconnectStop = (numAttempted: number) => {
		if (numAttempted === reconnectAttemptLimit) {
			dispatch(
				setAlert({
					severity: SeverityTypes.ERROR,
					message: 'Failed to connect to server. Please try again later.',
					open: true,
					loading: false,
				})
			);
		}
	};

	// set url for websocket
	const socketUrl = useMemo(
		() => `${process.env.REACT_APP_WEBSOCKET_SERVER}/${imagePost.uuid}/`,
		[imagePost.uuid]
	);

	// connect to server to capture generated caption
	const { lastJsonMessage } = useWebSocket(socketUrl, {
		shouldReconnect: (closeEvent) => true,
		reconnectAttempts: reconnectAttemptLimit,
		reconnectInterval: 3000,
		onReconnectStop: (numAttempted) => handleReconnectStop(numAttempted),
	});

	// detect when caption is received
	const [captionReceived, setCaptionReceived] = useState(false);
	const captionRef = useRef(captionReceived);
	captionRef.current = captionReceived;

	// receive caption from websocket
	useEffect(() => {
		if (lastJsonMessage) {
			// open dialog and create new image and associated caption
			setOpen(true);
			setCaptionReceived(true);
			const { image, ...rest } = imagePost;
			dispatch(
				createImage({
					...rest,
					caption: { text: lastJsonMessage['caption'] },
				})
			);

			// alert user of caption generation
			dispatch(
				setAlert({
					severity: SeverityTypes.SUCCESS,
					message: 'Your caption was successfully created!',
					open: true,
					loading: false,
				})
			);
		}
	}, [lastJsonMessage]); // eslint-disable-line react-hooks/exhaustive-deps

	// alert user of caption generation failure if too much time has passed
	useEffect(() => {
		const alertTimeout = setTimeout(() => {
			if (!captionRef.current) {
				dispatch(
					setAlert({
						severity: SeverityTypes.ERROR,
						message: 'Server timed out. Please try again later.',
						open: true,
						loading: false,
					})
				);
				handleDialog();
			}
		}, 75000);

		return () => clearTimeout(alertTimeout);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return image && image.uuid === imagePost.uuid ? (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			fullWidth
			className={styles.dialog}
			disableScrollLock
			onClose={handleDialog}
		>
			<DialogTitle>Your Image is Ready!</DialogTitle>
			<DialogContent>
				<img src={image.image} alt={image.title} className={styles.image} />
				<div
					style={
						fullScreen
							? {}
							: {
									width: 500,
									margin: 'auto',
							  }
					}
				>
					<Typography className={styles.caption} variant='body2'>
						{image.caption.text}
					</Typography>
					<div>
						<Typography className={styles.rate}>
							Did our AI do a good job?
						</Typography>
					</div>
					<div>
						<RatingButton type={RatingButtons.satisfactory} />
						<RatingButton type={RatingButtons.unsatisfactory} />
					</div>
					<CaptionTextField />
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialog} color='primary'>
					Exit
				</Button>
			</DialogActions>
		</Dialog>
	) : (
		<div />
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
		image: {
			maxWidth: '100%',
		},
		caption: {
			marginTop: 2,
			marginBottom: 20,
		},
		rate: {
			marginBottom: 3,
		},
	})
);

export default CaptionGeneratedDialog;
