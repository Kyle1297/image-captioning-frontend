import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import {
	GET_COMMENT,
	CREATE_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
	CommentPost,
	CommentPatch,
	CommentFilters,
	GET_COMMENTS,
	Comment,
	SET_COMMENT_IN_COMMENTS,
	EXTEND_COMMENTS,
} from '../types/comment';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/comments';

// GET COMMENTS
export const getComments = (
	filters: CommentFilters,
	newFilter: boolean = false
) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getComments,
		actionType: GET_COMMENTS,
		requestConfig: {
			url: `${API_SERVER}/`,
			method: MethodTypes.GET,
			params: filters,
		},
		newFilter: newFilter,
	});
};

// GET COMMENT
export const getComment = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.getComment,
		actionType: GET_COMMENT,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.GET,
		},
	});
};

// CREATE COMMENT
export const createComment = (data: CommentPost) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.createComment,
		actionType: CREATE_COMMENT,
		requestConfig: {
			url: `${API_SERVER}/`,
			method: MethodTypes.POST,
			data: data,
		},
		extraAction: EXTEND_COMMENTS,
	});
};

// UPDATE COMMENT
export const updateComment = (id: number, data: CommentPatch) => (
	dispatch: Dispatch
) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateComment,
		actionType: UPDATE_COMMENT,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.PATCH,
			data: data,
		},
		extraAction: SET_COMMENT_IN_COMMENTS,
	});
};

// REMOVE COMMENT
export const removeComment = (id: number) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.removeComment,
		actionType: REMOVE_COMMENT,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.DELETE,
		},
	});
};

// SET COMMENT IN COMMENTS
export const setCommentInComments = (comment: Comment) => ({
	type: SET_COMMENT_IN_COMMENTS,
	payload: comment,
});

// EXTEND COMMENTS
export const extendComments = (comment: Comment) => ({
	type: EXTEND_COMMENTS,
	payload: comment,
});
