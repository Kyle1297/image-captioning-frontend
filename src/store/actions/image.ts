import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import { requestError, requestStarted, requestSuccess } from './request';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { 
	GET_IMAGES,
	GET_IMAGE, 
	UPLOAD_IMAGE,
	UPDATE_IMAGE,
	REMOVE_IMAGE,
	SET_IMAGE,
	Image, 
} from '../types/image';


const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/images';

interface Filters {
  page?: number;
  uploaded_at?: Date;
  is_profile_image?: boolean;
  is_private?: boolean;
  user?: string;
  collections__category?: string;
  collections__is_main?: boolean;
};

// GET IMAGES
export const getImages = (filters: Filters) => (dispatch: Dispatch) => {
	// signal start of call
	const requestName = RequestEnums.getImages;
	dispatch(requestStarted({ 
		requestName: requestName, 
	}));

	// fetch images
	axios.get(`${API_SERVER}/`, {
		params: filters,
	})
		.then((response: AxiosResponse) => {
			// handle successful call
			dispatch(requestSuccess({ 
				requestName: requestName,
			}));

			// determine if another page of results exist and then dispatch
			let nextPage = null;
			if (response.data.next)
				nextPage = response.data.next.match(/page=(\d+)/)[1]
			dispatch({
				type: GET_IMAGES,
				payload: {
          images: response.data.results,
          nextPage: nextPage,
					count: response.data.count,
        },
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
};

// GET IMAGE
export const getImage = (uuid: string) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getImage,
		requestURL: `${API_SERVER}/${uuid}/`,
		requestMethod: MethodTypes.GET,
		actionType: GET_IMAGE,
	});
};

// CREATE IMAGE
export const createImage = (data: Image) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.uploadImage,
		requestURL: `${API_SERVER}/`,
		requestMethod: MethodTypes.POST,
		actionType: UPLOAD_IMAGE,
		requestParams: {
			data: data,
		},
	});
};

// UPDATE IMAGE
export const updateImage = (uuid: string, data: Image) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateImage,
		requestURL: `${API_SERVER}/${uuid}/`,
		requestMethod: MethodTypes.PATCH,
		actionType: UPDATE_IMAGE,
		requestParams: {
			data: data,
		},
	});
};

// REMOVE IMAGE
export const removeImage = (uuid: string) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeImage,
		requestURL: `${API_SERVER}/${uuid}/`,
		requestMethod: MethodTypes.DELETE,
		actionType: REMOVE_IMAGE,
	});
};

// SET IMAGE
export const setImage = (image: Image) => ({
	type: SET_IMAGE,
	payload: image,
});