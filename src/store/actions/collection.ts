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
	CollectionFilters,
	CollectionPost,
	SET_COLLECTION,
	EXTEND_COLLECTIONS,
} from '../types/collection';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/collections';

// GET COLLECTIONS
export const getCollections = (filters: CollectionFilters = {}) => (
	dispatch: Dispatch
) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getCollections,
		actionType: GET_COLLECTIONS,
		requestConfig: {
			url: `${API_SERVER}/`,
			method: MethodTypes.GET,
			params: filters,
		},
	});
};

// GET COLLECTION
export const getCollection = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getCollection,
		actionType: GET_COLLECTION,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.GET,
		},
	});
};

// CREATE COLLECTION
export const createCollection = (data: CollectionPost) => (
	dispatch: Dispatch
) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createCollection,
		actionType: CREATE_COLLECTION,
		requestConfig: {
			url: `${API_SERVER}/`,
			method: MethodTypes.POST,
			data: data,
		},
		extraAction: EXTEND_COLLECTIONS,
	});
};

// UPDATE COLLECTION
export const updateCollection = (id: number, data: Collection) => (
	dispatch: Dispatch
) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateCollection,
		actionType: UPDATE_COLLECTION,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.PATCH,
			data: data,
		},
	});
};

// REMOVE COLLECTION
export const removeCollection = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeCollection,
		actionType: REMOVE_COLLECTION,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.DELETE,
		},
	});
};

// SET COLLECTION
export const setCollection = (collection: Collection | null) => ({
	type: SET_COLLECTION,
	payload: collection,
});

// EXTEND COLLECTIONS
export const extendCollections = (collection: Collection) => ({
	type: EXTEND_COLLECTIONS,
	payload: collection,
});
