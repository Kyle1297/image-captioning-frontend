import { Reducer } from 'redux';
import {
	SET_ALERT,
	OPEN_ALERT,
	AlertState,
	AlertActionTypes,
	SeverityTypes,
} from '../types/alert';

const initialState: AlertState = {
	severity: SeverityTypes.SUCCESS,
	message: '',
	open: false,
	loading: null,
};

const alertReducer: Reducer<AlertState, AlertActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case OPEN_ALERT:
			return {
				...state,
				open: action.payload,
			};
		case SET_ALERT:
			return {
				...state,
				severity: action.payload.severity,
				message: action.payload.message,
				open: action.payload.open,
				loading: action.payload.loading,
			};
		default:
			return state;
	}
};

export default alertReducer;
