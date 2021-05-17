import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { AppState } from '../../../store/reducers';
import { Image, ImagesState } from '../../../store/types/image';
import { GetImagesParams } from '../../../store/actions/image';
import { getComments } from '../../../store/actions/comment';
import { Request, RequestEnums } from '../../../store/types/request';
import { namedRequestsInProgress } from '../../../store/selectors/request';
import ImageCardSkeleton from '../layout/skeletons/imageCardSkeleton';
import getSkeletonArray from '../layout/skeletons/getSkeletonArray';
import DisplayMessage, { MessageType } from '../layout/displayMessage';
import useMeasure from 'react-use-measure';
import CommentSkeleton from '../layout/skeletons/imageDetailsSkeleton/centralImageContentsSkeleton/commentSkeleton';
import { CommentsState } from '../../../store/types/comment';

interface Props {
	setGetParams?: Dispatch<SetStateAction<GetImagesParams>>;
	getParams?: GetImagesParams;
	uuid?: Image['uuid'];
}

const DiscoverButton: React.FC<Props> = ({ setGetParams, getParams, uuid }) => {
	// access styles
	const styles = useStyles();
	const [ref, { width }] = useMeasure();

	// access next page of data to retrieve
	const dispatch = useDispatch();
	const { nextPage, count } = useSelector<
		AppState,
		ImagesState | CommentsState
	>((state) => (uuid ? state.comments : state.images));

	// detect whether request is currently loading
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		uuid
			? namedRequestsInProgress(state, RequestEnums.getComments)
			: namedRequestsInProgress(state, RequestEnums.getImages)
	);

	// handle button click
	const handleDiscover = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (nextPage) {
			// COMMENTS
			if (uuid) {
				dispatch(
					getComments(
						{
							image: uuid,
							page: nextPage,
						},
						false
					)
				);
			}
			// IMAGES
			else if (setGetParams && getParams) {
				setGetParams({
					filters: {
						...getParams.filters,
						page: nextPage,
					},
					newFilter: false,
				});
			}
		}
	};

	// handle events following reaching loader ref
	const loader = useRef<HTMLButtonElement>(null);
	const handleObserver = useCallback(
		(entities: IntersectionObserverEntry[]) => {
			const target = entities[0];
			if (target.isIntersecting && nextPage) {
				// IMAGES
				if (getParams && setGetParams) {
					setGetParams({
						filters: {
							...getParams.filters,
							page: nextPage,
						},
						newFilter: false,
					});
				}
			}
		},
		[nextPage, setGetParams, getParams]
	);

	// initialize infinite scrolling and attach to loader ref
	useEffect(() => {
		if (!uuid) {
			const options = {
				root: null,
				rootMargin: '0px',
				threshold: 0,
			};
			const observer = new IntersectionObserver(handleObserver, options);
			if (loader.current) observer.observe(loader.current);
		}
	}, [handleObserver, uuid]);

	// add array for skeleton images/comments
	const [skeletonArray, setSkeletonArray] = useState<any[]>([]);
	useEffect(() => {
		if (uuid) setSkeletonArray(Array.from(new Array(5)));
		else if (width) setSkeletonArray(getSkeletonArray(width));
	}, [width, uuid]);

	return (
		<Grid
			container
			ref={ref}
			direction='column'
			justify='center'
			alignItems='center'
			style={
				uuid
					? { width: '100%', marginTop: '-30px', marginBottom: 15 }
					: { marginTop: 20, marginBottom: 30 }
			}
		>
			{isLoading ? (
				<Grid container spacing={uuid ? 0 : 2}>
					{skeletonArray.map((item: number, index: number) =>
						uuid ? (
							<CommentSkeleton key={index} />
						) : (
							<ImageCardSkeleton key={index} />
						)
					)}
				</Grid>
			) : nextPage ? (
				<Grid
					item
					style={uuid ? { width: '100%', marginTop: 35 } : { marginTop: 10 }}
				>
					<Button
						size={uuid ? 'medium' : 'large'}
						style={uuid ? {} : { borderRadius: '25px' }}
						className={styles.button}
						fullWidth
						variant='contained'
						color={uuid ? 'default' : 'primary'}
						onClick={handleDiscover}
						ref={loader}
					>
						{uuid ? 'Show more' : 'Discover more'}
					</Button>
				</Grid>
			) : uuid ? (
				<Typography className={styles.commentsText} color='textSecondary'>
					{count
						? "You've reached the end of the comments!"
						: 'No comments to show.'}
				</Typography>
			) : (
				<DisplayMessage
					message="That's all the images we have!"
					type={MessageType.SAD}
				/>
			)}
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
		},
		commentsText: {
			marginTop: 25,
			fontSize: 14,
			textAlign: 'center',
		},
	})
);

export default DiscoverButton;
