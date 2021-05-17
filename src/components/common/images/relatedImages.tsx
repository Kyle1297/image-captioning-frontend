import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { Image, ImagesState, ImageState } from '../../../store/types/image';
import { Typography } from '@material-ui/core';
import { getImages } from '../../../store/actions/image';
import { namedRequestsInProgress } from '../../../store/selectors/request';
import { Request, RequestEnums } from '../../../store/types/request';
import ImageResults from './imagesGrid/imageResults';

interface Props {
	uuid: Image['uuid'];
}

const RelatedImages: React.FC<Props> = ({ uuid }) => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image states
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);
	const { count, images } = useSelector<AppState, ImagesState>(
		(state) => state.images
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getImages)
	);

	// fetch related images
	const dispatch = useDispatch();
	useEffect(() => {
		if (image?.uuid === uuid && !isLoading) {
			dispatch(
				getImages(
					{
						is_private: false,
						is_profile_image: false,
						page: 1,
						collections: image.collections.length
							? image.collections.map((collection) => collection.category)
							: [],
					},
					true
				)
			);
		}
	}, [image?.uuid, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	// fetch more images if not enough are fetched
	useEffect(() => {
		if (count === 1) {
			dispatch(
				getImages(
					{
						is_private: false,
						is_profile_image: false,
						page: 1,
					},
					true
				)
			);
		}
	}, [count, dispatch]);

	return images && image ? (
		<div>
			<Typography
				className={styles.title}
				variant='subtitle2'
				color='textSecondary'
			>
				Related images
			</Typography>
			<div className={styles.images}>
				<ImageResults relatedImages />
			</div>
		</div>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			marginBottom: 10,
		},
		images: {
			textAlign: 'center',
		},
	})
);

export default RelatedImages;
