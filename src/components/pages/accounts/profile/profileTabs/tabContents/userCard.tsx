import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, useMediaQuery } from '@material-ui/core';
import { User } from '../../../../../../store/types/auth';
import UserSnippet from '../../../../../common/userSnippet';

interface Props {
	user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
	// control styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 650px');

	return (
		<Grid item xs={smallScreen ? 12 : 6}>
			<Card className={styles.card}>
				<CardContent>
					<UserSnippet user={user} />
				</CardContent>
			</Card>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			height: 107,
		},
	})
);

export default UserCard;
