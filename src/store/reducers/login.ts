import { Reducer } from 'redux';
import {
	SET_LOGIN,
	LoginActionTypes,
	LoginState,
	OPEN_LOGIN,
	SET_LOGIN_TAB,
	TabNumbers,
} from '../types/login';

const initialState: LoginState = {
	tab: TabNumbers.LOGIN,
	open: false,
};

const loginReducer: Reducer<LoginState, LoginActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case SET_LOGIN:
			return {
				...state,
				tab: action.payload.tab,
				open: action.payload.open,
			};
		case SET_LOGIN_TAB:
			return {
				...state,
				tab: action.payload,
			};
		case OPEN_LOGIN:
			return {
				...state,
				open: action.payload,
			};
		default:
			return state;
	}
};

export default loginReducer;
