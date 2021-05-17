import React from 'react';
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ImageCardSkeleton from '../imageCardSkeleton';

const SideImageDetailsSkeleton: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px', {
		noSsr: true,
	});

	return smallScreen ? (
		<div />
	) : (
		<Grid item className={styles.side}>
			<Skeleton className={styles.info} variant='rect' height={241} />
			<Skeleton className={styles.related} width={80} height={18} />
			<Grid container spacing={2}>
				{Array.from(new Array(5)).map((item: number, index: number) => (
					<ImageCardSkeleton key={index} small={true} />
				))}
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		side: {
			width: 300,
			marginTop: 50,
		},
		info: {
			marginBottom: 20,
		},
		related: {
			marginBottom: 10,
		},
	})
);

export default SideImageDetailsSkeleton;
