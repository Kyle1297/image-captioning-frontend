import React, { useLayoutEffect, useState } from 'react';
import ImageDisplay from './imageDisplay';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducers';
import Comments from './comments';
import ImageActions from './imageActions';
import { ImageState } from '../../../../store/types/image';
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import LikeCount from './likeCount';
import CollectionTags from '../../../common/collections/collectionTags';
import RelatedImages from '../../../common/images/relatedImages';
import UserSnippet from '../../../common/userSnippet';

const defaultImage = {
	width: 2560,
	height: 1644,
};

interface Props {
	containerWidth: number;
}

const CentralImageContents: React.FC<Props> = ({ containerWidth }) => {
	// access styles and image states
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px');
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	// handle image width
	const [imageLoadError, setImageLoadError] = useState<boolean>(false);
	const [imageWidth, setImageWidth] = useState<number>(0);
	useLayoutEffect(() => {
		let newWidth = containerWidth;
		if (!smallScreen) newWidth = containerWidth - 310;
		if (imageLoadError) setImageWidth(newWidth);
		else if (image) {
			if (image.width < newWidth) setImageWidth(image.width);
			else setImageWidth(newWidth);
		}
	}, [image, containerWidth, imageLoadError, smallScreen]);

	return image ? (
		<Grid item xs>
			<UserSnippet />
			<ImageDisplay
				imageHeight={
					imageLoadError
						? // dimensions of default image
						  (defaultImage.height / defaultImage.width) * imageWidth
						: (image.height / image.width) * imageWidth
				}
				setImageLoadError={setImageLoadError}
				imageLoadError={imageLoadError}
			/>
			<LikeCount />
			<ImageActions imageWidth={imageWidth} />
			{image.collections.length ? (
				<div className={styles.tags}>
					<CollectionTags outlined={true} collections={image.collections} />
				</div>
			) : (
				''
			)}
			<Comments />
			{smallScreen ? (
				<div className={styles.related}>
					<RelatedImages uuid={image.uuid} />
				</div>
			) : (
				''
			)}
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		related: {
			marginTop: 10,
		},
		tags: {
			marginTop: 20,
		},
	})
);

export default CentralImageContents;
