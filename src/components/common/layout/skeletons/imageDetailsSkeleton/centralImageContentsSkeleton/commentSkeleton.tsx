import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const CommentSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();

	return (
		<Grid container spacing={2} className={styles.root}>
			<Grid item>
				<Skeleton animation='wave' variant='circle' height={40} width={40} />
			</Grid>
			<Grid item xs>
				<Grid container spacing={1} direction='column'>
					<Grid item>
						<Skeleton animation='wave' className={styles.text} />
					</Grid>
					<Grid item>
						<Skeleton animation='wave' height={18} />
					</Grid>
					<Grid item>
						<Grid container spacing={2}>
							<Grid item>
								<Skeleton
									animation='wave'
									variant='rect'
									height={20}
									width={100}
								/>
							</Grid>
						</Grid>
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
			marginTop: 20,
		},
		text: {
			maxWidth: 225,
			width: '60%',
		},
	})
);

export default CommentSkeleton;
