import { Reducer } from 'redux';
import {
	CommentsState,
	CommentsActionTypes,
	GET_COMMENTS,
	SET_COMMENT_IN_COMMENTS,
	EXTEND_COMMENTS,
} from '../types/comment';

const initialState: CommentsState = {
	comments: [],
	nextPage: null,
	count: 0,
	newFilter: true,
};

const commentsReducer: Reducer<CommentsState, CommentsActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_COMMENTS:
			if (action.payload.newFilter)
				return {
					...state,
					comments: [...action.payload.comments],
					nextPage: action.payload.nextPage,
					count: action.payload.count,
					newFilter: false,
				};
			else
				return {
					...state,
					comments: [...state.comments, ...action.payload.comments],
					nextPage: action.payload.nextPage,
					count: action.payload.count,
					newFilter: false,
				};
		case SET_COMMENT_IN_COMMENTS:
			return {
				...state,
				comments: state.comments.map((comment) => {
					if (comment.id === action.payload.id) return action.payload;
					return comment;
				}),
			};
		case EXTEND_COMMENTS:
			return {
				...state,
				comments: [action.payload, ...state.comments],
				count: state.count + 1,
			};
		default:
			return state;
	}
};

export default commentsReducer;
