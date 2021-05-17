import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TagsSkeleton from '../tagsSkeleton';
import useMeasure from 'react-use-measure';

const UserDetailsSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 700px', { noSsr: true });
	const [ref, { width }] = useMeasure();

	return (
		<Grid
			container
			className={styles.root}
			justify='center'
			direction={smallScreen ? 'column' : 'row'}
			spacing={smallScreen ? 3 : 7}
			ref={ref}
		>
			<Grid item>
				<Skeleton variant='circle' animation='wave' width={135} height={135} />
			</Grid>
			<Grid item style={smallScreen ? { width: width } : { width: 500 }}>
				<Grid container spacing={2} direction='column'>
					<Grid item>
						<Skeleton animation='wave' variant='rect' width={225} height={34} />
					</Grid>
					<Grid item>
						<Skeleton
							animation='wave'
							width={smallScreen ? '100%' : 450}
							height={22}
							className={styles.width}
						/>
					</Grid>
					<Grid item>
						<Skeleton animation='wave' width={150} height={22} />
					</Grid>
					<Grid item>
						<Skeleton animation='wave' width={150} height={22} />
					</Grid>
					<Grid item>
						<TagsSkeleton />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 100,
		},
		width: {
			maxWidth: 450,
		},
	})
);

export default UserDetailsSkeleton;
