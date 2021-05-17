import React, { Fragment } from 'react';
import {
	createStyles,
	Divider,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import EditProfileSkeleton from './editProfileSkeleton';
import EditAboutSkeleton from './editAboutSkeleton';

const EditInfoSkeleton: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 550px', {
		noSsr: true,
	});

	return (
		<Fragment>
			<EditProfileSkeleton />
			<Divider className={smallScreen ? styles.xsDivider : styles.divider} />
			<EditAboutSkeleton />
			<Skeleton
				className={styles.button}
				animation='wave'
				variant='rect'
				width='100%'
				height={38}
			/>
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			marginTop: 2,
			marginBottom: 30,
		},
		divider: {
			marginTop: 7,
			marginBottom: 28,
		},
		xsDivider: {
			marginTop: 8,
			marginBottom: 27,
		},
	})
);

export default EditInfoSkeleton;
