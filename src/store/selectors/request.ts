import { AppState } from '../reducers';

// get request part of the state
const requestState = (state: AppState) => state.requests;

// check if any requests are currently in progress
export const requestsInProgress = (state: AppState) =>
	requestState(state).requests.filter((request) => request.isLoading).length >
	0;

// get requests in progress either by single requestName or by requestNames array
export const namedRequestsInProgress = (
	state: AppState,
	requestName: number | number[]
) => {
	const singleNamedRequestInProgress = (singleRequestName: number) =>
		requestState(state).requests.find(
			(request) => request.name === singleRequestName && request.isLoading
		) !== undefined;

	// checking multiple requests
	if (Array.isArray(requestName)) {
		return requestName.some(singleNamedRequestInProgress);
	}

	// checking single request
	return singleNamedRequestInProgress(requestName);
};

// retrieve a request's error
export const namedRequestError = (state: AppState, requestName: number) =>
	requestState(state).requests.find(
		(request) => request.name === requestName && request.error !== null
	)?.error;
