import { Container } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPublicUser, setPublicUser } from '../../../../store/actions/auth';
import { AppState } from '../../../../store/reducers';
import { AuthState } from '../../../../store/types/auth';
import UserDetails from './userDetails';
import ProfileTabs from './profileTabs';
import { Request, RequestEnums } from '../../../../store/types/request';
import { namedRequestError } from '../../../../store/selectors/request';
import ProfileSkeleton from '../../../common/layout/skeletons/profileSkeleton';
import ErrorPage from '../../errorPage';

interface URLParams {
	username: string;
}

const Profile: React.FC = () => {
	// retrieve users
	const loggedUser = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const publicUser = useSelector<AppState, AuthState['publicUser']>(
		(state) => state.auth.publicUser
	);
	const publicUserError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.getPublicUser)
	);

	// retrieve user
	const { username } = useParams<URLParams>();
	const dispatch = useDispatch();
	useEffect(() => {
		if (
			username !== loggedUser?.username &&
			username !== publicUser?.username
		) {
			dispatch(getPublicUser(username));
		} else dispatch(setPublicUser(loggedUser));
	}, [username, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	return publicUserError ? (
		<ErrorPage />
	) : (
		<Container>
			{username === publicUser?.username ? (
				<Fragment>
					<UserDetails />
					<ProfileTabs />
				</Fragment>
			) : (
				<ProfileSkeleton />
			)}
		</Container>
	);
};

export default Profile;
