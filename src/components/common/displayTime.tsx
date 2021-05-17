import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import TimeAgo from 'react-timeago';
import { extractDateFormat } from '../utils/extractDateFormat';

interface Props {
	timestamp: string;
	edited?: boolean;
	prefix?: string;
	suffix?: string;
	fontSize?: number;
}

const DisplayTime: React.FC<Props> = ({
	timestamp,
	edited,
	prefix,
	suffix,
	fontSize,
}) => {
	// retrieve styles
	const styles = useStyles();

	return (
		<Tooltip title={extractDateFormat(timestamp)} placement='right'>
			<Typography
				variant='caption'
				style={fontSize ? { fontSize: fontSize } : {}}
				className={styles.date}
			>
				{prefix} <TimeAgo date={timestamp} title='' minPeriod={15} />
				{suffix}
				{edited ? ' (edited)' : ''}
			</Typography>
		</Tooltip>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		date: {
			color: grey[600],
		},
	})
);

export default DisplayTime;
