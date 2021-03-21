import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import { 
	GET_COLLECTIONS,
	GET_COLLECTION, 
	CREATE_COLLECTION,
	UPDATE_COLLECTION,
	REMOVE_COLLECTION,
	Collection, 
} from '../types/collection';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { requestError, requestStarted, requestSuccess } from './request';


const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/collections';

interface Filters {
  page?: number;
  is_main?: boolean;
};

// GET COLLECTIONS
export const getCollections = (filters: Filters) => (dispatch: Dispatch) => {
	const requestName = RequestEnums.getCollections;
	dispatch(requestStarted({ 
		requestName: requestName, 
	}));
	axios.get(`${API_SERVER}/`, {
		params: filters,
	})
		.then((response: AxiosResponse) => {
			dispatch(requestSuccess({ 
				requestName: requestName,
			}));
			dispatch({
				type: GET_COLLECTIONS,
				payload: response.data,
			});
		})
		.catch((error: AxiosError) => {
			console.log(error)
			dispatch(requestError({ 
				requestName: requestName, 
				error: error,
			}));
		});        
};

// GET COLLECTION
export const getCollection = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getCollection,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.GET,
		actionType: GET_COLLECTION,
	});
};

// CREATE COLLECTION
export const createCollection = (data: Collection) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createCollection,
		requestURL: `${API_SERVER}/`,
		requestMethod: MethodTypes.POST,
		actionType: CREATE_COLLECTION,
		requestParams: {
			data: data,
		},
	});
};

// UPDATE COLLECTION
export const updateCollection = (id: number, data: Collection) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateCollection,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.PATCH,
		actionType: UPDATE_COLLECTION,
		requestParams: {
			data: data,
		},
	});
};

// REMOVE COLLECTION
export const removeCollection = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeCollection,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.DELETE,
		actionType: REMOVE_COLLECTION,
	});
};