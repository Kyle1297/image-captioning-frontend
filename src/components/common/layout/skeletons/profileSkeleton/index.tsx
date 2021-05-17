import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment, useMemo } from 'react';
import UserDetailsSkeleton from './userDetailsSkeleton';
import { Skeleton } from '@material-ui/lab';
import ImageCardSkeleton from '../imageCardSkeleton';
import useMeasure from 'react-use-measure';
import getSkeletonArray from '../getSkeletonArray';

const ProfileSkeleton: React.FC = () => {
	// retrieve styles
	const styles = useStyles();
	const [ref, { width }] = useMeasure();

	// retrieve array for skeletons
	const skeletonArray = useMemo(() => {
		if (width) return getSkeletonArray(width);
	}, [width]);

	return (
		<div ref={ref}>
			{width ? (
				<Fragment>
					<UserDetailsSkeleton />
					<Skeleton
						className={styles.tabSkeleton}
						animation='wave'
						variant='rect'
						width='100%'
						height={35}
					/>
					{Array.from(new Array(3)).map((item: number, index: number) => (
						<Grid
							key={index}
							container
							spacing={2}
							className={styles.imageSkeletons}
						>
							{skeletonArray?.map((item: number, index: number) => (
								<ImageCardSkeleton key={index} />
							))}
						</Grid>
					))}
				</Fragment>
			) : (
				''
			)}
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tabSkeleton: {
			marginTop: 39,
			marginBottom: 16,
		},
		imageSkeletons: {
			marginBottom: 15,
		},
	})
);

export default ProfileSkeleton;
