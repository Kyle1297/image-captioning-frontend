import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

interface Props {
	image: File;
}

const FileDetails: React.FC<Props> = ({ image }) => {
	// access style classes and check for small screen
	const styles = useStyles();

	// convert image size to MB
	const bytesToMegaBytes = (bytes: number) =>
		(bytes / (1024 * 1024)).toFixed(2);

	return (
		<Fragment>
			<Typography noWrap variant='body2'>
				{image.name}
			</Typography>
			<Typography className={styles.size} variant='body2'>
				{bytesToMegaBytes(image.size)} MB
			</Typography>
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		size: {
			color: green[600],
			fontWeight: 'lighter',
			whiteSpace: 'nowrap',
			marginLeft: 10,
		},
	})
);

export default FileDetails;
