import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppActions, AppFilters, AppModels, AppPatch, AppPost } from '../types';
import { requestStarted, requestSuccess, requestError } from './request';
import { GET_IMAGES } from '../types/image';
import { GET_COMMENTS } from '../types/comment';
import {
	AUTH_ERROR,
	REGISTER_USER,
	LOGIN_USER,
	GET_USER,
	REMOVE_USER,
	UPDATE_USER,
	UserLogin,
	PublicUser,
	SET_PUBLIC_USER,
	SET_USER_IMAGE,
} from '../types/auth';

export enum MethodTypes {
	GET = 'get',
	POST = 'post',
	PATCH = 'patch',
	DELETE = 'delete',
}

export interface RequestHeaders {
	'Content-Type': string;
	Authorization?: string;
}

interface RequestConfig {
	url: string;
	method: MethodTypes;
	params?: AppFilters;
	headers?: RequestHeaders;
	data?: AppModels | AppPatch | AppPost | UserLogin;
}

interface Params {
	dispatch: Dispatch;
	requestName: number;
	actionType: AppActions['type'];
	requestConfig: RequestConfig;
	newFilter?: boolean;
	extraAction?: AppActions['type'];
	publicUser?: PublicUser;
}

export const requestHelper = ({
	dispatch,
	requestName,
	actionType,
	requestConfig,
	newFilter = false,
	extraAction,
	publicUser,
}: Params) => {
	// signal start of request
	dispatch(
		requestStarted({
			requestName: requestName,
		})
	);

	// send request
	axios(requestConfig)
		.then((response: AxiosResponse) => {
			// handle successful call
			dispatch(
				requestSuccess({
					requestName: requestName,
				})
			);

			// DELETE
			if (requestConfig.method === MethodTypes.DELETE) {
				dispatch({
					type: actionType,
				});
			}

			// GET_IMAGES, GET_COMMENTS
			else if (actionType === GET_IMAGES || actionType === GET_COMMENTS) {
				// check if another page of results exists, then dispatch
				let nextPage = null;
				if (response.data.next)
					nextPage = response.data.next.match(/page=(\d+)/)[1];

				// set payload
				let payload = {};
				if (actionType === GET_COMMENTS)
					payload = {
						nextPage: nextPage,
						count: response.data.count,
						newFilter: newFilter,
						comments: response.data.results,
					};
				else
					payload = {
						nextPage: nextPage,
						count: response.data.count,
						newFilter: newFilter,
						images: response.data.results,
					};

				// dispatch payload
				dispatch({
					type: actionType,
					payload: payload,
				});
			}

			// GET, POST, PATCH
			else {
				dispatch({
					type: actionType,
					payload: response.data,
				});
			}

			// dispatch additional action, if necessary
			if (extraAction) {
				dispatch({
					type: extraAction,
					payload:
						extraAction === SET_USER_IMAGE
							? response.data.uploader.profile.image
							: response.data,
				});
			}

			// update public user, if necessary
			if (publicUser) {
				dispatch({
					type: SET_PUBLIC_USER,
					payload: publicUser,
				});
			}
		})
		.catch((error: AxiosError) => {
			// handle unsuccessful call
			dispatch(
				requestError({
					requestName: requestName,
					error: {
						data: error.response?.data,
					},
				})
			);

			// send additional error action for authentication
			const userActions = [
				GET_USER,
				LOGIN_USER,
				REGISTER_USER,
				UPDATE_USER,
				REMOVE_USER,
			];
			if (userActions.includes(actionType))
				dispatch({
					type: AUTH_ERROR,
				});
		});
};

export const authRequestHeaders = (token: string | null) => {
	// configure request header
	let headers: RequestHeaders = {
		'Content-Type': 'application/json',
	};
	if (token) headers['Authorization'] = `Token ${token}`;
	return headers;
};
