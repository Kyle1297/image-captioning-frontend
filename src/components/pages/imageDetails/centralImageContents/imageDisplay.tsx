import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducers';
import { ImageState } from '../../../../store/types/image';
import { Typography } from '@material-ui/core';
import HoverImageBox from '../../../common/images/hoverImageBox';
import { blueGrey } from '@material-ui/core/colors';
import { Skeleton } from '@material-ui/lab';

interface Props {
	imageHeight: number;
	setImageLoadError: Dispatch<SetStateAction<boolean>>;
	imageLoadError: boolean;
}

const ImageDisplay: React.FC<Props> = ({
	imageHeight,
	imageLoadError,
	setImageLoadError,
}) => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	// handle image hovering
	const [hovering, setHovering] = useState<boolean>(false);
	const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(true);
	const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(false);

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const handleImageLoad = () => setImageLoaded(true);

	// handle image load error, e.g. image url returns 404
	const handleImageLoadError = () => setImageLoadError(true);

	return image ? (
		<Fragment>
			<div
				className={styles.root}
				onMouseEnter={handleEnterHover}
				onMouseLeave={handleExitHover}
			>
				<img
					className={styles.image}
					src={imageLoadError ? '/noImage.png' : image.image}
					alt={imageLoadError ? 'Image not available' : image.title}
					style={
						imageLoaded || imageLoadError
							? { height: imageHeight }
							: { display: 'none' }
					}
					onLoad={handleImageLoad}
					onError={handleImageLoadError}
				/>
				<Skeleton
					className={styles.image}
					animation='wave'
					variant='rect'
					height={imageHeight + 4}
					style={imageLoaded || imageLoadError ? { display: 'none' } : {}}
				/>
				<HoverImageBox hovering={hovering} />
			</div>
			<Typography variant='body2' className={styles.caption}>
				{(() => {
					if (imageLoadError) return 'There was an error retrieving the image.';
					else if (!image.caption)
						return "There was an error retrieving this image's caption.";
					else if (image.caption.corrected_text)
						return image.caption.corrected_text;
					else return image.caption.text;
				})()}
			</Typography>
		</Fragment>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
		},
		image: {
			maxWidth: '100%',
			maxHeight: '100%',
		},
		caption: {
			color: blueGrey[800],
			marginTop: 1,
			marginBottom: 15,
		},
	})
);

export default ImageDisplay;
