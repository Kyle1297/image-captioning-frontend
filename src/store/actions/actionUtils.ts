import { Dispatch } from 'redux';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AppActions, AppFilters, AppModels, AppPatch, AppPost } from '../types';
import { requestStarted, requestSuccess, requestError } from './request';
import {
	CREATE_IMAGE,
	GET_IMAGES,
	Image,
	ImagesState,
	ImageState,
} from '../types/image';
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
	SET_USER_COUNT,
} from '../types/auth';
import store from '..';

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
	uuid?: Image['uuid'];
}

export const requestHelper = ({
	dispatch,
	requestName,
	actionType,
	requestConfig,
	newFilter = false,
	extraAction,
	publicUser,
	uuid,
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

			// update user's liked count, if necessary
			if (uuid) {
				// determine initial image likes before image is updated
				let prevLikes: null | number = null;
				const currentLikes = response.data?.likes?.length;
				const image = store.getState().image.image as ImageState['image'];
				if (image?.uuid === uuid) {
					prevLikes = image.likes.length;
				} else {
					const images = store.getState().images
						.images as ImagesState['images'];
					let currentImage = images.find((item) => item.uuid === uuid);
					if (currentImage) prevLikes = currentImage.likes.length;
				}

				// calculate new user liked counts
				const userCounts = store.getState().auth.user?.counts;
				let newLikes = userCounts.liked;
				if (userCounts && prevLikes !== null) {
					if (currentLikes > prevLikes) newLikes += 1;
					else if (currentLikes < prevLikes) newLikes -= 1;
					dispatch({
						type: SET_USER_COUNT,
						payload: {
							...userCounts,
							liked: newLikes,
						},
					});
				}
			}

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

			// update image uploaded counts, if necessary
			if (actionType === CREATE_IMAGE) {
				const image = response.data as Image;
				let userCounts = store.getState().auth.user?.counts;

				// ensure known uploader and captioned images, then update count accordingly
				if (!image.is_profile_image && userCounts) {
					if (image.is_private)
						userCounts = {
							...userCounts,
							private: (userCounts.private += 1),
						};
					else
						userCounts = {
							...userCounts,
							public: (userCounts.public += 1),
						};
					dispatch({
						type: SET_USER_COUNT,
						payload: userCounts,
					});
				}
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
