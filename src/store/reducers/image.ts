import { Reducer } from 'redux';
import {
	GET_IMAGE,
	UPDATE_IMAGE,
	REMOVE_IMAGE,
	SET_IMAGE,
	ImageState,
	ImageActionTypes,
	CREATE_IMAGE,
	UPLOAD_IMAGE,
} from '../types/image';

const initialState: ImageState = {
	image: null,
};

const imageReducer: Reducer<ImageState, ImageActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_IMAGE:
		case CREATE_IMAGE:
		case UPDATE_IMAGE:
		case SET_IMAGE:
			return {
				...state,
				image: action.payload,
			};
		case REMOVE_IMAGE:
			return {
				...state,
				image: null,
			};
		case UPLOAD_IMAGE:
		default:
			return state;
	}
};

export default imageReducer;
