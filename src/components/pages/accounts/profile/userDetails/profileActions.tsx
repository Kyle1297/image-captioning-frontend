import React, { useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, useMediaQuery } from '@material-ui/core';
import { AuthState } from '../../../../../store/types/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import RedirectButton from '../../../../common/buttons/redirectButton';
import { Edit } from '@material-ui/icons';
import { updateUser } from '../../../../../store/actions/auth';
import { BsPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { blue } from '@material-ui/core/colors';

const ProfileActions: React.FC = () => {
	// access styles
	const styles = useStyles();
	const xsScreen = useMediaQuery('(max-width: 310px');

	// retrieve users
	const loggedUser = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const publicUser = useSelector<AppState, AuthState['publicUser']>(
		(state) => state.auth.publicUser
	);

	// check if current user already follows public user
	const userFollows = useMemo(() => {
		if (publicUser && loggedUser)
			return loggedUser.profile.following.some(
				(user) => user.id === publicUser.id
			);
		return false;
	}, [publicUser, loggedUser]);

	// handle user following
	const dispatch = useDispatch();
	const handleFollowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (publicUser && loggedUser) {
			let loggedUserFollowingIds = loggedUser.profile.following.map(
				(followingUser) => followingUser.id
			);
			let publicUserFollowers = publicUser.profile.following;
			dispatch(
				updateUser(
					{
						following_ids: userFollows
							? loggedUserFollowingIds.filter((user) => user !== publicUser.id)
							: [...loggedUserFollowingIds, publicUser.id],
					},
					{
						...publicUser,
						profile: {
							...publicUser.profile,
							followers: userFollows
								? publicUserFollowers.filter(
										(user) => user.id !== loggedUser.id
								  )
								: [...publicUserFollowers, loggedUser],
						},
					}
				)
			);
		}
	};

	return (
		<Grid item className={styles.root}>
			{publicUser && loggedUser ? (
				publicUser.username === loggedUser.username ? (
					<RedirectButton
						url={`/account`}
						label={xsScreen ? 'Edit' : 'Edit profile'}
						icon={<Edit className={styles.redirectIcon} color='action' />}
					/>
				) : (
					<IconButton className={styles.iconButton} onClick={handleFollowClick}>
						{userFollows ? (
							<BsPersonCheckFill className={styles.checked} />
						) : (
							<BsFillPersonPlusFill />
						)}
					</IconButton>
				)
			) : (
				''
			)}
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginLeft: 20,
		},
		redirectIcon: {
			fontSize: 18,
			marginRight: 6,
		},
		iconButton: {
			width: 35,
			height: 35,
			padding: 8,
		},
		checked: {
			color: blue[800],
		},
	})
);

export default ProfileActions;
