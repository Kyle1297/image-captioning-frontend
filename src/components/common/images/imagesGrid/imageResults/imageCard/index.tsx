import React, { useMemo, useState } from 'react';
import { Image, ImageState } from '../../../../../../store/types/image';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';
import {
	Grid,
	Card,
	CardMedia,
	useTheme,
	useMediaQuery,
	Typography,
	CardContent,
} from '@material-ui/core';
import HoverImageBox from '../../../hoverImageBox';
import { Link } from 'react-router-dom';
import { AppState } from '../../../../../../store/reducers';
import { useSelector } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import useMeasure from 'react-use-measure';

interface Props {
	uuid: Image['uuid'];
	small?: boolean;
	removeHover?: boolean;
}

const ImageCard: React.FC<Props> = ({ uuid, small, removeHover }) => {
	// control styles
	const styles = useStyles();
	const theme = useTheme();
	const xsScreen = useMediaQuery('(max-width: 300px)');
	const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));
	const [ref, { width }] = useMeasure();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>((state) =>
		state.images.images.find((image) => image.uuid === uuid)
	);

	// handle image card hovering
	const [hovering, setHovering] = useState<boolean>(false);
	const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(true);
	const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(false);

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const handleImageLoad = () => setImageLoaded(true);

	// handle image load error, e.g. image url returns 404
	const [imageError, setImageError] = useState<boolean>(false);
	const handleImageError = () => setImageError(true);

	// determine image height
	const imageHeight = useMemo(
		() =>
			small
				? 155
				: width > 850
				? width > 1600
					? 755
					: 555
				: xsScreen
				? 335
				: 355,
		[small, width, xsScreen]
	);

	return image ? (
		<Grid ref={ref} item xs>
			<Card
				raised={hovering ? true : false}
				style={
					small
						? { height: 200 }
						: width > 850
						? width > 1600
							? { height: 800 }
							: { height: 600 }
						: { height: 400 }
				}
				onMouseEnter={handleEnterHover}
				onMouseLeave={handleExitHover}
			>
				<Link to={`/images/${uuid}`} className={styles.link}>
					<div className={styles.imageRoot}>
						{small || removeHover ? (
							''
						) : (
							<HoverImageBox uuid={uuid} hovering={hovering} />
						)}
						<CardMedia
							component='img'
							height={imageHeight}
							image={imageError ? '/noImage.png' : image.image}
							title={imageError ? 'Image not available' : image.title}
							style={getImageStyles(
								false,
								imageLoaded || imageError,
								smallScreen,
								xsScreen,
								small
							)}
							onLoad={handleImageLoad}
							onError={handleImageError}
						/>
						<Skeleton
							animation='wave'
							variant='rect'
							style={getImageStyles(
								true,
								imageLoaded || imageError,
								smallScreen,
								xsScreen,
								small
							)}
							height={imageHeight}
						/>
					</div>
					<CardContent
						id={!xsScreen || small ? '' : 'content'}
						style={!xsScreen || small ? { height: 45 } : { height: 65 }}
						className={!xsScreen || small ? styles.content : ''}
					>
						<Typography
							id={!xsScreen || small ? '' : 'caption'}
							noWrap={!xsScreen || small ? true : false}
							variant='body2'
						>
							{(() => {
								if (imageError)
									return 'There was an error retrieving the image.';
								else if (!image.caption)
									return "There was an error retrieving this image's caption.";
								else if (image.caption.corrected_text)
									return image.caption.corrected_text;
								else return image.caption.text;
							})()}
						</Typography>
					</CardContent>
				</Link>
			</Card>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		content: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		link: {
			color: 'black',
			textDecoration: 'none',
		},
		imageRoot: {
			position: 'relative',
		},
	})
);

// determine styles for image or its skeleton
const getImageStyles = (
	skeleton: boolean,
	imageFinished: boolean,
	smallScreen: boolean,
	xsScreen: boolean,
	small: boolean | undefined
) => {
	// determine styles when displayed
	const displayStyles =
		smallScreen || small
			? !xsScreen || small
				? { minWidth: 300 }
				: { minWidth: 240 }
			: { minWidth: 395 };

	// allocate appropriate styles
	if (imageFinished) {
		if (skeleton) return { display: 'none' };
		else return displayStyles;
	} else {
		if (skeleton) return displayStyles;
		else return { display: 'none' };
	}
};

export default ImageCard;
