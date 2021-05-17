import { Reducer } from 'redux';
import {
	GET_COMMENT,
	CREATE_COMMENT,
	UPDATE_COMMENT,
	REMOVE_COMMENT,
	CommentState,
	CommentActionTypes,
} from '../types/comment';

const initialState: CommentState = {
	comment: null,
};

const commentReducer: Reducer<CommentState, CommentActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_COMMENT:
		case CREATE_COMMENT:
		case UPDATE_COMMENT:
			return {
				...state,
				comment: action.payload,
			};
		case REMOVE_COMMENT:
			return {
				...state,
				comment: null,
			};
		default:
			return state;
	}
};

export default commentReducer;
