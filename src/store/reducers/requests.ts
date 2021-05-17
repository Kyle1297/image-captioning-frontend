import { Reducer } from 'redux';
import {
	REQUEST_STARTED,
	REQUEST_SUCCESS,
	REQUEST_ERROR,
	RequestsState,
	RequestsActionTypes,
} from '../types/request';

const initialState: RequestsState = {
	requests: [],
};

const requestsReducer: Reducer<RequestsState, RequestsActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case REQUEST_STARTED: {
			const existingCall = state.requests.find(
				(request) => request.name === action.payload.name
			);

			if (existingCall) {
				return {
					...state,
					requests: state.requests.map((request) =>
						request.name === action.payload.name
							? { ...request, isLoading: true, error: null }
							: request
					),
				};
			}

			return {
				...state,
				requests: [...state.requests, action.payload],
			};
		}

		case REQUEST_SUCCESS:
			return {
				...state,
				requests: state.requests.filter(
					(request) => request.name !== action.payload.name
				),
			};

		case REQUEST_ERROR:
			return {
				...state,
				requests: state.requests.map((request) =>
					request.name === action.payload.name
						? {
								...request,
								error: action.payload.error,
								isLoading: false,
						  }
						: request
				),
			};

		default:
			return state;
	}
};

export default requestsReducer;
