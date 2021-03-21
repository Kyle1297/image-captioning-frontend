import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import { 
	GET_COMMENT, 
	CREATE_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
	Comment, 
} from '../types/comment';


const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/comments';

// GET COMMENT
export const getComment = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getComment,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.GET,
		actionType: GET_COMMENT,
	});
};

// CREATE COMMENT
export const createComment = (data: Comment) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createComment,
		requestURL: `${API_SERVER}/`,
		requestMethod: MethodTypes.POST,
		actionType: CREATE_COMMENT,
		requestParams: {
			data: data,
		},
	});
};

// UPDATE COMMENT
export const updateComment = (id: number, data: Comment) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateComment,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.PATCH,
		actionType: UPDATE_COMMENT,
		requestParams: {
			data: data,
		},
	});
};

// REMOVE COMMENT
export const removeComment = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeComment,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.DELETE,
		actionType: REMOVE_COMMENT,
	});
};