export const SET_LOGIN_TAB = 'SET_LOGIN_TAB';
export const OPEN_LOGIN = 'OPEN_LOGIN';
export const SET_LOGIN = 'SET_LOGIN';

export enum TabNumbers {
	LOGIN,
	JOIN,
}

// initial state
export interface LoginState {
	tab: TabNumbers;
	open: boolean;
}

// actions
interface SetLoginTabAction {
	type: typeof SET_LOGIN_TAB;
	payload: LoginState['tab'];
}

interface OpenLoginAction {
	type: typeof OPEN_LOGIN;
	payload: LoginState['open'];
}

interface SetLoginAction {
	type: typeof SET_LOGIN;
	payload: LoginState;
}

export type LoginActionTypes =
	| SetLoginTabAction
	| OpenLoginAction
	| SetLoginAction;
