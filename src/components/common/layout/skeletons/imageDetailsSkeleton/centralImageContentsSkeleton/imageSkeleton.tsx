import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const ImageSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();

	return (
		<Grid item xs>
			<Skeleton animation='wave' variant='rect' height={320} />
			<Skeleton animation='wave' className={styles.text} />
			<Skeleton animation='wave' width='80%' />
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		text: {
			marginBottom: 6,
			marginTop: 11,
		},
	})
);

export default ImageSkeleton;
