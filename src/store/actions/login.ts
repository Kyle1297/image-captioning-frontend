import {
	SET_LOGIN_TAB,
	OPEN_LOGIN,
	LoginState,
	SET_LOGIN,
} from '../types/login';

// SET LOGIN TAB
export const setLoginTab = (tab: LoginState['tab']) => ({
	type: SET_LOGIN_TAB,
	payload: tab,
});

// OPEN LOGIN
export const setLogin = (login: LoginState) => ({
	type: SET_LOGIN,
	payload: login,
});

// CLOSE LOGIN
export const openLogin = (open: LoginState['open']) => ({
	type: OPEN_LOGIN,
	payload: open,
});
