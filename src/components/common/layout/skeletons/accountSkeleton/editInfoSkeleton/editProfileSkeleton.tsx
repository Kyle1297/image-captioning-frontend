import React from 'react';
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TextFieldSkeleton from './textFieldSkeleton';

const EditProfileSkeleton: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 550px', {
		noSsr: true,
	});
	const xsScreen = useMediaQuery('(max-width: 415px', {
		noSsr: true,
	});

	return (
		<Grid container className={styles.root} spacing={2} direction='column'>
			<Grid item>
				<Skeleton animation='wave' variant='rect' width={82} height={16} />
			</Grid>
			<Grid
				item
				style={xsScreen ? { marginBottom: -8 } : {}}
				className={styles.subText}
			>
				<Skeleton
					animation='wave'
					variant='rect'
					width={xsScreen ? '100%' : 384}
					height={12}
				/>
			</Grid>
			{xsScreen ? (
				<Grid item>
					<Skeleton animation='wave' variant='rect' width='50%' height={12} />
				</Grid>
			) : (
				''
			)}
			<Grid item className={styles.textFields}>
				<Grid container spacing={smallScreen ? 1 : 2}>
					<TextFieldSkeleton
						marginBottom={smallScreen ? 28 : 21}
						xs={smallScreen ? 12 : true}
					/>
					<TextFieldSkeleton xs marginBottom={21} />
				</Grid>
			</Grid>
			<TextFieldSkeleton />
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 0,
		},
		subText: {
			marginTop: -2,
		},
		textFields: {
			marginTop: 21,
		},
	})
);

export default EditProfileSkeleton;
