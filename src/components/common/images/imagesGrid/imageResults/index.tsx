import React, { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { RequestEnums, Request } from '../../../../../store/types/request';
import { AppState } from '../../../../../store/reducers';
import { Grid, useMediaQuery } from '@material-ui/core';
import ImageCard from './imageCard';
import { ImagesState } from '../../../../../store/types/image';
import DisplayMessage, { MessageType } from '../../../layout/displayMessage';
import DiscoverButton from '../../../buttons/discoverButton';
import ImageCardSkeleton from '../../../layout/skeletons/imageCardSkeleton';
import { namedRequestError } from '../../../../../store/selectors/request';
import getSkeletonArray from '../../../layout/skeletons/getSkeletonArray';
import { GetImagesParams } from '../../../../../store/actions/image';
import useMeasure from 'react-use-measure';

interface Props {
	setGetParams?: Dispatch<SetStateAction<GetImagesParams>>;
	getParams?: GetImagesParams;
	relatedImages?: boolean;
	removeHover?: boolean;
}

const ImageResults: React.FC<Props> = ({
	setGetParams,
	getParams,
	relatedImages,
	removeHover,
}) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px');
	const [ref, { width }] = useMeasure();

	// retrieve images
	const { images, newFilter } = useSelector<AppState, ImagesState>(
		(state) => state.images
	);
	const error = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.getImages)
	);

	// add array for skeleton images
	const skeletonArray = useMemo(
		() => (relatedImages ? Array.from(new Array(5)) : getSkeletonArray(width)),
		[width, relatedImages]
	);

	return (
		<div ref={ref}>
			{error ? (
				<DisplayMessage
					message='Oops... there was an error. You might need to try again later!'
					type={MessageType.ERROR}
				/>
			) : newFilter ? (
				<Fragment>
					{Array.from(new Array(3)).map((item: number, index: number) => (
						<Grid
							key={index}
							container
							justify='center'
							spacing={2}
							className={styles.skeletons}
						>
							{skeletonArray.map((item, index) => (
								<ImageCardSkeleton
									key={index}
									small={!smallScreen && width && relatedImages ? true : false}
									width={
										smallScreen && width && relatedImages ? width : undefined
									}
								/>
							))}
						</Grid>
					))}
				</Fragment>
			) : images.length ? (
				<Fragment>
					<Grid container justify='center' alignItems='center' spacing={2}>
						{images.map((item) => (
							<ImageCard
								key={item.uuid}
								uuid={item.uuid}
								small={relatedImages ? (smallScreen ? false : true) : undefined}
								removeHover={removeHover}
							/>
						))}
					</Grid>
					{relatedImages ? (
						''
					) : (
						<DiscoverButton setGetParams={setGetParams} getParams={getParams} />
					)}
				</Fragment>
			) : (
				<DisplayMessage
					message='Hmmm... no images were found.'
					type={MessageType.ERROR}
				/>
			)}
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		skeletons: {
			marginBottom: 15,
		},
	})
);

export default ImageResults;
