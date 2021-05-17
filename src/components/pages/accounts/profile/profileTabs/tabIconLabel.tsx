import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
	label: string;
	Icon: React.ComponentType<any>;
	count: number;
}

const TabIconLabel: React.FC<Props> = ({ label, Icon, count }) => {
	// control styles
	const styles = useStyles();

	return (
		<div className={styles.label}>
			<Icon className={styles.icon} />
			{label}
			<span className={styles.count}>{count}</span>
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		label: {
			fontSize: 12,
			margin: 0,
		},
		icon: {
			verticalAlign: 'middle',
			marginRight: 10,
			fontSize: 18,
		},
		count: {
			marginLeft: 7,
		},
	})
);

export default TabIconLabel;
