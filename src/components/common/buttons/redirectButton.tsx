import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

interface Props {
	url: string;
	label: string;
	icon?: React.ReactNode;
}

const RedirectButton: React.FC<Props> = ({ url, label, icon }) => {
	// access styles
	const styles = useStyles();

	// redirect to page
	const history = useHistory();
	const handleRedirect = () => history.push(url);

	return (
		<Button
			className={styles.button}
			onClick={handleRedirect}
			variant={icon ? 'outlined' : 'text'}
			size={icon ? 'small' : 'medium'}
		>
			{icon}
			{label}
		</Button>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
			fontSize: 15,
		},
	})
);

export default RedirectButton;
