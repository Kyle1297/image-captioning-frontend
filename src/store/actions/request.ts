import {
	REQUEST_STARTED,
	REQUEST_SUCCESS,
	REQUEST_ERROR,
	ErrorMessage,
} from '../types/request';

interface RequestParams {
	requestName: number;
}

interface RequestErrorParams extends RequestParams {
	error: ErrorMessage;
}

// REQUEST STARTED
export const requestStarted = ({ requestName }: RequestParams) => ({
	type: REQUEST_STARTED,
	payload: {
		name: requestName,
		isLoading: true,
	},
});

// REQUEST SUCCESS
export const requestSuccess = ({ requestName }: RequestParams) => ({
	type: REQUEST_SUCCESS,
	payload: {
		name: requestName,
		isLoading: false,
	},
});

// REQUEST ERROR
export const requestError = ({ requestName, error }: RequestErrorParams) => {
	return {
		type: REQUEST_ERROR,
		payload: {
			name: requestName,
			isLoading: false,
			error: error,
		},
	};
};
