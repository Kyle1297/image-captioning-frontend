import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AvatarGroup, Skeleton } from '@material-ui/lab';

const GroupedAvatarsSkeleton: React.FC = () => {
	// control styles
	const styles = useStyles();

	return (
		<Grid container spacing={1} alignItems='center' className={styles.root}>
			<Grid item>
				<AvatarGroup max={2} spacing={4}>
					{Array.from(new Array(2)).map((item, index) => (
						<Skeleton
							key={index}
							animation='wave'
							variant='circle'
							className={styles.avatar}
						/>
					))}
				</AvatarGroup>
			</Grid>
			<Grid item>
				<Skeleton animation='wave' width={125} />
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 25,
			marginBottom: 3,
		},
		avatar: {
			width: 20,
			height: 20,
		},
	})
);

export default GroupedAvatarsSkeleton;
