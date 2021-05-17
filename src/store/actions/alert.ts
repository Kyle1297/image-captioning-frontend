import { SET_ALERT, OPEN_ALERT, AlertState } from '../types/alert';

// SET ALERT
export const setAlert = (alert: AlertState) => ({
	type: SET_ALERT,
	payload: alert,
});

// OPEN ALERT
export const openAlert = (open: AlertState['open']) => ({
	type: OPEN_ALERT,
	payload: open,
});
