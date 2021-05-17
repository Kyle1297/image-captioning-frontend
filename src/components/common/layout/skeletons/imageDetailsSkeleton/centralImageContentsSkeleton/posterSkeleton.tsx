import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const PosterSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();

	return (
		<Fragment>
			<Skeleton className={styles.top} animation='wave' height={25} />
			<Grid container alignItems='center' spacing={2}>
				<Grid item>
					<Skeleton animation='wave' variant='circle' height={44} width={44} />
				</Grid>
				<Grid item xs>
					<Skeleton animation='wave' variant='rect' height={38} />
				</Grid>
			</Grid>
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		top: {
			marginBottom: 20,
		},
	})
);

export default PosterSkeleton;
