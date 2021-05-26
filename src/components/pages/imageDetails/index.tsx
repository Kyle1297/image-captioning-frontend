import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { getImage, updateImage } from '../../../store/actions/image';
import { Request, RequestEnums } from '../../../store/types/request';
import DisplayMessage, {
	MessageType,
} from '../../common/layout/displayMessage';
import useMeasure from 'react-use-measure';
import { ImageState } from '../../../store/types/image';
import CentralImageContents from './centralImageContents';
import SideImageContents from './sideImageContents';
import {
	CircularProgress,
	Container,
	createStyles,
	Grid,
	makeStyles,
	Theme,
} from '@material-ui/core';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../store/selectors/request';

interface URLParams {
	uuid: string;
}

const ImageDetails: React.FC = () => {
	// access styles and retrieve window dimensions and new image parameters
	const styles = useStyles();
	const [ref, { width }] = useMeasure();
	const { uuid } = useParams<URLParams>();

	// retrieve image states
	const image = useSelector<AppState, ImageState['image']>((state) =>
		state.image.image?.uuid === uuid ? state.image.image : undefined
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getImage)
	);
	const error = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.getImage)
	);

	// fetch image and update image views
	const dispatch = useDispatch();
	const [imageUpdated, setImageUpdated] = useState<boolean>(false);
	useEffect(() => {
		if (image?.uuid !== uuid) dispatch(getImage(uuid));
		setImageUpdated(true);
	}, [dispatch, uuid]); // eslint-disable-line react-hooks/exhaustive-deps

	// update image views
	useEffect(() => {
		if (image?.uuid === uuid && imageUpdated) {
			dispatch(
				updateImage(uuid, {
					views: image.views + 1,
				})
			);
		}
	}, [dispatch, uuid, imageUpdated]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container ref={ref} className={styles.root}>
			{error ? (
				<div className={styles.centre}>
					<DisplayMessage
						message="Hmmm... we couldn't find the image you're looking for. Please try again later."
						type={MessageType.ERROR}
					/>
				</div>
			) : image && !isLoading ? (
				<Grid container spacing={2}>
					<CentralImageContents containerWidth={width} />
					<SideImageContents />
				</Grid>
			) : (
				<div className={styles.centre}>
					<CircularProgress />
				</div>
			)}
		</Container>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 30,
		},
		centre: {
			textAlign: 'center',
		},
	})
);

export default ImageDetails;
