import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes, authRequestHeaders } from './actionUtils';
import {
	GET_USER,
	LOGIN_USER,
	REGISTER_USER,
	UPDATE_USER,
	LOGOUT_USER,
	REMOVE_USER,
	UserLogin,
	UserPatch,
	GET_PUBLIC_USER,
	User,
	AuthState,
	SET_PUBLIC_USER,
	PublicUser,
	SET_USER_IMAGE,
	SET_USER_COUNT,
} from '../types/auth';
import { AppState } from '../reducers';
import { Image } from '../types/image';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/auth';

// GET USER
export const getUser = () => (dispatch: Dispatch, getState: () => AppState) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getUser,
		actionType: GET_USER,
		requestConfig: {
			url: `${API_SERVER}/user/`,
			method: MethodTypes.GET,
			headers: authRequestHeaders(getState().auth.token),
		},
	});
};

// GET PUBLIC USER
export const getPublicUser =
	(username: User['username']) => (dispatch: Dispatch) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.getPublicUser,
			actionType: GET_PUBLIC_USER,
			requestConfig: {
				url: `${API_SERVER}/user/${username}`,
				method: MethodTypes.GET,
			},
		});
	};

// LOGIN USER
export const loginUser = (data: UserLogin) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.loginUser,
		actionType: LOGIN_USER,
		requestConfig: {
			url: `${API_SERVER}/login/`,
			method: MethodTypes.POST,
			data: data,
		},
	});
};

// REGISTER USER
export const registerUser = (data: UserLogin) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.registerUser,
		actionType: REGISTER_USER,
		requestConfig: {
			url: `${API_SERVER}/register/`,
			method: MethodTypes.POST,
			data: data,
		},
	});
};

// LOGOUT USER
export const logoutUser =
	() => (dispatch: Dispatch, getState: () => AppState) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.logoutUser,
			actionType: LOGOUT_USER,
			requestConfig: {
				url: `${API_SERVER}/logout/`,
				method: MethodTypes.POST,
				headers: authRequestHeaders(getState().auth.token),
			},
		});
	};

// UPDATE USER
export const updateUser =
	(data: UserPatch, publicUser?: PublicUser) =>
	(dispatch: Dispatch, getState: () => AppState) => {
		// update logged in user
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.updateUser,
			actionType: UPDATE_USER,
			requestConfig: {
				url: `${API_SERVER}/user/`,
				method: MethodTypes.PATCH,
				headers: authRequestHeaders(getState().auth.token),
				data: data,
			},
			publicUser: publicUser,
		});
	};

// REMOVE USER
export const removeUser =
	() => (dispatch: Dispatch, getState: () => AppState) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.removeUser,
			actionType: REMOVE_USER,
			requestConfig: {
				url: `${API_SERVER}/user/`,
				method: MethodTypes.DELETE,
			},
		});
	};

// SET PUBLIC USER
export const setPublicUser = (publicUser: AuthState['publicUser']) => ({
	type: SET_PUBLIC_USER,
	payload: publicUser,
});

// SET USER IMAGE
export const setUserImage = (image: Image['image']) => ({
	type: SET_USER_IMAGE,
	payload: image,
});

// SET USER COUNT
export enum CountTypes {
	PUBLIC,
	PRIVATE,
	LIKED,
	DISLIKED,
}

export const setUserCount =
	(countType: CountTypes) => (dispatch: Dispatch, getState: () => AppState) => {
		let userCounts = getState().auth.user?.counts;
		if (userCounts) {
			switch (countType) {
				case CountTypes.PUBLIC:
					return (userCounts.public += 1);
				case CountTypes.LIKED:
					return (userCounts.liked += 1);
				case CountTypes.DISLIKED:
					return (userCounts.liked -= 1);
				case CountTypes.PRIVATE:
					return (userCounts.private += 1);
				default:
					return userCounts;
			}
		}
		dispatch({
			type: SET_USER_COUNT,
			payload: userCounts,
		});
	};
