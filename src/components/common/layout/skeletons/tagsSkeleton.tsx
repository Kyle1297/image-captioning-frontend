import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const TagsSkeleton: React.FC = () => {
	// retrieve styles
	const styles = useStyles();

	return (
		<div className={styles.root}>
			{Array.from(new Array(5)).map((item, index) => (
				<Skeleton
					key={index}
					animation='wave'
					variant='circle'
					width={22}
					height={22}
				/>
			))}
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			'& > *': {
				marginRight: theme.spacing(2),
			},
		},
	})
);

export default TagsSkeleton;
