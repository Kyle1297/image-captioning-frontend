import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { AuthState } from '../../../../../store/types/auth';
import CollectionTags from '../../../../common/collections/collectionTags';
import useMeasure from 'react-use-measure';
import UserTime from './userTime';
import UserName from './userName';
import UserAvatar, { UserTypes } from '../../../../common/layout/userAvatar';
import ProfileActions from './profileActions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import UserInfo from './userInfo';
import { Public } from '@material-ui/icons';

const UserDetails: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 700px', { noSsr: true });
	const [ref, { width }] = useMeasure();

	// retrieve user
	const user = useSelector<AppState, AuthState['publicUser']>(
		(state) => state.auth.publicUser
	);

	return (
		<Grid
			container
			className={styles.root}
			justify='center'
			direction={smallScreen ? 'column' : 'row'}
			spacing={smallScreen ? 3 : 7}
			ref={ref}
		>
			<Grid item>
				<Grid container justify={smallScreen ? 'space-between' : 'flex-start'}>
					<Grid item>
						<UserAvatar user={user} noLink userType={UserTypes.USER_LARGE} />
					</Grid>
					{smallScreen ? <ProfileActions /> : ''}
				</Grid>
			</Grid>
			<Grid item style={smallScreen ? { width: width } : { width: 500 }}>
				<Grid container spacing={2} direction='column'>
					<UserName />
					<Grid item zeroMinWidth>
						<Typography className={styles.bio} variant='body2'>
							{user?.profile.bio
								? user.profile.bio
								: `Download free, beautifully captioned images curated by ${
										user ? `@${user.username}` : 'our hidden gems'
								  }.`}
						</Typography>
					</Grid>
					<UserTime />
					<UserInfo
						Icon={Public}
						contents={user ? user.profile.location : 'Everywhere'}
					/>
					{user?.profile.interests ? (
						<Grid item>
							<CollectionTags collections={user.profile.interests} />
						</Grid>
					) : (
						''
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 100,
		},
		bio: {
			wordBreak: 'break-word',
		},
	})
);

export default UserDetails;
