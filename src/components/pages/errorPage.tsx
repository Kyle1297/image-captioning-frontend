import React from 'react';
import DisplayMessage, { MessageType } from '../common/layout/displayMessage';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';

const ErrorPage: React.FC = () => {
	// access styles
	const styles = useStyles();

	return (
		<Container className={styles.centre}>
			<DisplayMessage
				message="Hmmm... we couldn't find the page you're looking for. Please try again later."
				type={MessageType.ERROR}
			/>
		</Container>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		centre: {
			textAlign: 'center',
		},
	})
);

export default ErrorPage;
