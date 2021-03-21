import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import { 
	GET_USER, 
	CREATE_USER,
	UPDATE_USER,
	REMOVE_USER,
	User, 
} from '../types/user';


const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/users';

// GET USER
export const getUser = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getUser,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.GET,
		actionType: GET_USER,
	});
};

// CREATE USER
export const createUser = (data: User) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createUser,
		requestURL: `${API_SERVER}/`,
		requestMethod: MethodTypes.POST,
		actionType: CREATE_USER,
		requestParams: {
			data: data,
		},
	});
};

// UPDATE USER
export const updateUser = (id: number, data: User) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateUser,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.PATCH,
		actionType: UPDATE_USER,
		requestParams: {
			data: data,
		},
	});
};

// REMOVE USER
export const removeUser = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeUser,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.DELETE,
		actionType: REMOVE_USER,
	});
};