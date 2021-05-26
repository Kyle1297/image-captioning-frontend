import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import DisplayTime from '../../../../common/displayTime';
import { WatchLaterOutlined } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { AppState } from '../../../../../store/reducers';
import { useSelector } from 'react-redux';
import { AuthState } from '../../../../../store/types/auth';

const UserTime: React.FC = () => {
	// access styles
	const styles = useStyles();

	// retrieve user
	const user = useSelector<
		AppState,
		AuthState['publicUser'] | AuthState['user']
	>((state) => state.auth.publicUser);

	return (
		<Grid item>
			<Grid container spacing={1} alignItems='center'>
				<Grid item>
					<WatchLaterOutlined className={styles.icon} />
				</Grid>
				<Grid item>
					{user && user?.username !== 'Anonymous' ? (
						<DisplayTime
							timestamp={user.date_joined}
							prefix='Joined'
							fontSize={13}
						/>
					) : (
						<Typography variant='body2' className={styles.subText}>
							Since the dawn of time
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			fontSize: 11,
			color: grey[600],
		},
		subText: {
			color: grey[600],
			fontSize: 13,
		},
	})
);

export default UserTime;
