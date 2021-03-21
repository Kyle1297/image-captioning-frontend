import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppActions, AppModels } from '../types';
import { 
  requestStarted,
  requestSuccess,
  requestError,
} from './request';

export enum MethodTypes {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
};

interface RequestParams {
	filters?: object;
	data?: AppModels | {};
};

interface Params {
	dispatch: Dispatch;
	requestName: number;
	requestURL: string;
	requestMethod: MethodTypes;
	actionType: AppActions["type"];
	requestParams?: RequestParams; 
};

export const requestHelper = ({
	dispatch, requestName, requestURL, requestMethod, actionType, requestParams = {
		filters: {},
		data: {},
	}
}: Params) => {
	// signal start of request
  dispatch(requestStarted({ 
    requestName: requestName, 
  }));

	// handle different api calls
	switch (requestMethod) {
		case MethodTypes.GET:
			axios.get(requestURL, {
				params: requestParams.filters,
			})
				.then((response: AxiosResponse) => {
					// handle successful call
					console.log(response);
					dispatch(requestSuccess({ 
						requestName: requestName,
					}));
					dispatch({
						type: actionType,
						payload: response.data.results,
					});
				})
				.catch((error: AxiosError) => {
					// handle unsuccessful call
					console.log(error)
					dispatch(requestError({ 
						requestName: requestName, 
						error: error,
					}));
				});
			return;
		
		case MethodTypes.POST:
			axios.post(requestURL, requestParams.data)
				.then((response: AxiosResponse) => {
					// handle successful call
					dispatch(requestSuccess({ 
						requestName: requestName,
					}));
					dispatch({
						type: actionType,
						payload: response.data,
					});
				})
				.catch((error: AxiosError) => {
					// handle unsuccessful call
					dispatch(requestError({ 
						requestName: requestName, 
						error: error,
					}));
				});
			return;

			case MethodTypes.PATCH:
				axios.patch(requestURL, requestParams.data)
					.then((response: AxiosResponse) => {
						// handle successful call
						dispatch(requestSuccess({ 
							requestName: requestName,
						}));
						dispatch({
							type: actionType,
							payload: response.data,
						});
					})
					.catch((error: AxiosError) => {
						// handle unsuccessful call
						dispatch(requestError({ 
							requestName: requestName, 
							error: error,
						}));
					});
				return;
			
			case MethodTypes.DELETE:
				axios.delete(requestURL)
					.then((response: AxiosResponse) => {
						// handle successful call
						dispatch(requestSuccess({ 
							requestName: requestName,
						}));
						dispatch({
							type: actionType,
						});
					})
					.catch((error: AxiosError) => {
						// handle unsuccessful call
						dispatch(requestError({ 
							requestName: requestName, 
							error: error,
						}));
					});
				return;
	};
};