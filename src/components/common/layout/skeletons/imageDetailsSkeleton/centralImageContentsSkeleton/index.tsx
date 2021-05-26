import React from 'react';
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import ImageSkeleton from './imageSkeleton';
import UserAvatarSkeleton from './userAvatarSkeleton';
import GroupedAvatarsSkeleton from './groupedAvatarsSkeleton';
import PosterSkeleton from './posterSkeleton';
import CommentSkeleton from './commentSkeleton';
import ImageCardSkeleton from '../../imageCardSkeleton';
import { Skeleton } from '@material-ui/lab';

const CentralImageDetailsSkeleton: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px');
	const skeletonArray = Array.from(new Array(1));

	return (
		<Grid item xs>
			<UserAvatarSkeleton />
			<ImageSkeleton />
			<GroupedAvatarsSkeleton />
			<PosterSkeleton />
			{skeletonArray.map((item: number, index: number) => (
				<CommentSkeleton key={index} />
			))}
			{smallScreen ? (
				<div className={styles.imageSkeletons}>
					<Skeleton className={styles.related} width={80} height={18} />
					{skeletonArray.map((item: number, index: number) => (
						<div key={index} className={styles.imageSkeleton}>
							<ImageCardSkeleton />
						</div>
					))}
				</div>
			) : (
				''
			)}
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		related: {
			marginBottom: 10,
		},
		imageSkeletons: {
			marginTop: 30,
		},
		imageSkeleton: {
			marginBottom: 10,
		},
	})
);

export default CentralImageDetailsSkeleton;
