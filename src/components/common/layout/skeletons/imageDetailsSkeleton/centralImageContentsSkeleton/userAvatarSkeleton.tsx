import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const UserAvatarSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();

	return (
		<Grid container spacing={2} className={styles.root}>
			<Grid item>
				<Skeleton animation='wave' variant='circle' height={40} width={40} />
			</Grid>
			<Grid item xs>
				<Grid container direction='column'>
					<Grid item className={styles.username}>
						<Skeleton animation='wave' width={90} />
					</Grid>
					<Grid item>
						<Skeleton animation='wave' width={125} />
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
			marginBottom: 3,
		},
		username: {
			marginBottom: 3,
		},
	})
);

export default UserAvatarSkeleton;
