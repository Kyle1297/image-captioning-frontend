import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

interface Props {
	text: string;
	width: string | number;
}

const DividerText: React.FC<Props> = ({ text, width }) => {
	const styles = useStyles();
	return (
		<div className={styles.container} style={{ width: width }}>
			<div className={styles.border} />
			<span className={styles.content}>
				<Typography variant='body1'>{text}</Typography>
			</span>
			<div className={styles.border} />
		</div>
	);
};

export default DividerText;

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			alignItems: 'center',
			margin: 'auto',
			marginBottom: theme.spacing(3),
		},
		border: {
			borderBottom: '1px solid',
			color: 'lightgray',
			width: '100%',
		},
		content: {
			paddingTop: theme.spacing(0.5),
			paddingBottom: theme.spacing(0.5),
			paddingRight: theme.spacing(2),
			paddingLeft: theme.spacing(2),
			color: 'gray',
		},
	})
);
