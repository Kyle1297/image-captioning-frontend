import React from 'react';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const EditImageSkeleton: React.FC = () => {
	// retrieve styles
	const styles = useStyles();

	return (
		<Grid
			container
			justify='center'
			direction='column'
			alignItems='center'
			spacing={2}
		>
			<Grid item className={styles.top}>
				<Skeleton animation='wave' variant='circle' width={135} height={135} />
			</Grid>
			<Grid item>
				<Skeleton animation='wave' variant='rect' width={160} height={28} />
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		top: {
			marginTop: 11,
			marginBottom: 10,
		},
	})
);

export default EditImageSkeleton;
