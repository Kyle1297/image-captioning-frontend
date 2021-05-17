import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { AuthState } from '../../../../../store/types/auth';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import ProfileActions from './profileActions';

const UserName: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 700px');

	// retrieve user
	const user = useSelector<
		AppState,
		AuthState['publicUser'] | AuthState['user']
	>((state) => state.auth.publicUser);

	return user ? (
		<Grid item xs>
			<Grid
				container
				wrap='nowrap'
				className={styles.nowrap}
				spacing={1}
				alignItems='center'
			>
				<Grid item style={smallScreen ? {} : { maxWidth: 323 }} zeroMinWidth>
					<Typography noWrap variant='h4'>
						{user.username === 'Anonymous'
							? user.username
							: `@${user.username}`}
					</Typography>
				</Grid>
				{smallScreen ? '' : <ProfileActions />}
			</Grid>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		nowrap: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		icon: {
			fontSize: 18,
			marginRight: 6,
		},
	})
);

export default UserName;
