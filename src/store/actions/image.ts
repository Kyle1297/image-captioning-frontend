import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes, authRequestHeaders } from './actionUtils';
import {
	GET_IMAGES,
	GET_IMAGE,
	UPLOAD_IMAGE,
	UPDATE_IMAGE,
	REMOVE_IMAGE,
	SET_IMAGE,
	Image,
	ImageFilters,
	ImagePatch,
	ImagePost,
	CREATE_IMAGE,
	SET_IMAGE_IN_IMAGES,
	EXTEND_IMAGES,
	ImagesState,
	SET_IMAGE_FILTER,
	SET_CAPTION_IN_IMAGES,
} from '../types/image';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { requestError, requestStarted, requestSuccess } from './request';
import { AppState } from '../reducers';
import { SET_USER_IMAGE } from '../types/auth';
import { Caption } from '../types/caption';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/images';

export interface GetImagesParams {
	filters: ImageFilters;
	newFilter: boolean;
}

// GET IMAGES
export const getImages =
	(filters: ImageFilters, newFilter: boolean = false) =>
	(dispatch: Dispatch, getState: () => AppState) => {
		// stringify collections array filter
		if (filters.collections?.length)
			filters = {
				...filters,
				collections: JSON.stringify(filters.collections),
			};
		else if (filters.collections) {
			const { collections, ...rest } = filters;
			filters = rest;
		}

		// indicate new search
		if (newFilter) dispatch(setImageFilter(newFilter));

		// send request
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.getImages,
			actionType: GET_IMAGES,
			requestConfig: {
				url: `${API_SERVER}/`,
				method: MethodTypes.GET,
				headers: authRequestHeaders(getState().auth.token),
				params: filters,
			},
			newFilter: newFilter,
		});
	};

// GET IMAGE
export const getImage =
	(uuid: string) => (dispatch: Dispatch, getState: () => AppState) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.getImage,
			actionType: GET_IMAGE,
			requestConfig: {
				url: `${API_SERVER}/${uuid}/`,
				method: MethodTypes.GET,
				headers: authRequestHeaders(getState().auth.token),
			},
		});
	};

// CREATE IMAGE
export const createImage = (data: ImagePost) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createImage,
		actionType: CREATE_IMAGE,
		requestConfig: {
			url: `${API_SERVER}/`,
			method: MethodTypes.POST,
			data: data,
		},
		extraAction: data.is_profile_image ? SET_USER_IMAGE : EXTEND_IMAGES,
	});
};

// UPLOAD IMAGE
export const uploadImage = (data: ImagePost) => (dispatch: Dispatch) => {
	if (data.image) {
		// signal start of request
		const requestName = RequestEnums.uploadImage;
		dispatch(
			requestStarted({
				requestName: requestName,
			})
		);

		// retrieve presigned url for image upload to s3
		axios
			.get(`${process.env.REACT_APP_API_SERVER}/utils/presign-s3`, {
				params: {
					method: 'POST',
					uuid: data.uuid,
					file_type: data.type,
					is_private: data.is_private,
					is_profile_image: data.is_profile_image,
				},
			})
			.then((response: AxiosResponse) => {
				// handle image upload to s3
				let postData = new FormData();
				for (let key in response.data.signed_url.fields) {
					postData.append(key, response.data.signed_url.fields[key]);
				}
				if (data.image) postData.append('file', data.image);
				return axios.post(response.data.url, postData);
			})
			.then((response) => {
				// handle successful call
				dispatch(
					requestSuccess({
						requestName: requestName,
					})
				);
				dispatch({
					type: UPLOAD_IMAGE,
				});

				// create image, if profile picture
				if (data.is_profile_image) {
					const { image, ...rest } = data;
					dispatch(createImage(rest) as any);
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
			});
	}
};

// UPDATE IMAGE
export const updateImage =
	(uuid: string, data: ImagePatch) => (dispatch: Dispatch) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.updateImage,
			actionType: UPDATE_IMAGE,
			requestConfig: {
				url: `${API_SERVER}/${uuid}/`,
				method: MethodTypes.PATCH,
				data: data,
			},
			extraAction: SET_IMAGE_IN_IMAGES,
			uuid: data.likes ? uuid : undefined,
		});
	};

// REMOVE IMAGE
export const removeImage = (uuid: string) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeImage,
		actionType: REMOVE_IMAGE,
		requestConfig: {
			url: `${API_SERVER}/${uuid}/`,
			method: MethodTypes.DELETE,
		},
	});
};

// SET IMAGE
export const setImage = (image: Image) => ({
	type: SET_IMAGE,
	payload: image,
});

// SET IMAGE IN IMAGES
export const setImageInImages = (image: Image) => ({
	type: SET_IMAGE_IN_IMAGES,
	payload: image,
});

// SET CAPTION IN IMAGES
export const setCaptionInImages = (caption: Caption) => ({
	type: SET_CAPTION_IN_IMAGES,
	payload: caption,
});

// EXTEND IMAGES
export const extendImages = (image: Image) => ({
	type: EXTEND_IMAGES,
	payload: image,
});

export const setImageFilter = (newFilter: ImagesState['newFilter']) => ({
	type: SET_IMAGE_FILTER,
	payload: newFilter,
});
