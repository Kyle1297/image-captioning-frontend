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
	const xsScreen = useMediaQuery('(max-width: 383px', {
		noSsr: true,
	});

	return (
		<Grid container spacing={2} direction='column'>
			<Grid item>
				<Skeleton animation='wave' variant='rect' width={82} height={16} />
			</Grid>
			<Grid item className={styles.subText}>
				<Skeleton
					animation='wave'
					variant='rect'
					width={xsScreen ? '100%' : 350}
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
			<TextFieldSkeleton
				marginTop={33}
				marginBottom={21}
				xs={smallScreen ? 12 : true}
			/>
			<TextFieldSkeleton height={55} marginBottom={27} />
			<TextFieldSkeleton height={96} />
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		subText: {
			marginTop: 0,
			marginBottom: -8,
		},
		helperText: {
			marginLeft: 20,
			marginBottom: 31,
		},
	})
);

export default EditProfileSkeleton;
