import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { AppState } from '../../store/reducers';
import { namedRequestsInProgress } from '../../store/selectors/request';
import { AuthState } from '../../store/types/auth';
import { Request, RequestEnums } from '../../store/types/request';
import Account from '../pages/accounts/account';
import AccountSkeleton from '../common/layout/skeletons/accountSkeleton';

interface Props {
	Component: React.ComponentType<any>;
	exact: boolean;
	path: string;
}

const PrivateRouter: React.FC<Props> = ({ Component, ...rest }) => {
	// retrieve user's status
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getUser)
	);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isLoading || isAuthenticated === null) {
					if (Component === Account) return <AccountSkeleton />;
				} else if (isAuthenticated === false) return <Redirect to='/' />;
				else return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRouter;
