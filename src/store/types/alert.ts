export const SET_ALERT = 'SET_ALERT';
export const OPEN_ALERT = 'OPEN_ALERT';

export enum SeverityTypes {
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info',
	SUCCESS = 'success',
}

// initial state
export interface AlertState {
	severity: SeverityTypes;
	message: string;
	open: boolean;
	loading: boolean | null;
}

// actions
interface SetAlertAction {
	type: typeof SET_ALERT;
	payload: AlertState;
}

interface OpenAlertAction {
	type: typeof OPEN_ALERT;
	payload: AlertState['open'];
}

export type AlertActionTypes = SetAlertAction | OpenAlertAction;
