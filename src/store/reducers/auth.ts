import { Reducer } from 'redux';
import {
	GET_USER,
	LOGIN_USER,
	REGISTER_USER,
	UPDATE_USER,
	LOGOUT_USER,
	REMOVE_USER,
	AuthState,
	AuthActionTypes,
	AUTH_ERROR,
	GET_PUBLIC_USER,
	SET_PUBLIC_USER,
	SET_USER_IMAGE,
} from '../types/auth';

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	user: null,
	publicUser: null,
};

const authReducer: Reducer<AuthState, AuthActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_USER:
		case UPDATE_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case REGISTER_USER:
		case LOGIN_USER:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: true,
				user: action.payload.user,
			};
		case LOGOUT_USER:
		case REMOVE_USER:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
			};
		case GET_PUBLIC_USER:
		case SET_PUBLIC_USER:
			return {
				...state,
				publicUser: action.payload,
			};
		case SET_USER_IMAGE:
			if (state.user)
				return {
					...state,
					user: {
						...state.user,
						profile: {
							...state.user.profile,
							image: action.payload,
						},
					},
				};
			else return state;
		default:
			return state;
	}
};

export default authReducer;
