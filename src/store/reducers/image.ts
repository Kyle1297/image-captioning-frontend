import { Reducer } from 'redux';
import { 
	GET_IMAGE, 
	UPLOAD_IMAGE,
	UPDATE_IMAGE,
	REMOVE_IMAGE,
	SET_IMAGE,
	ImageState, 
	ImageActionTypes, 
} from '../types/image';


const initialState: ImageState = {
  image: null,
};

const imageReducer: Reducer<ImageState, ImageActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case GET_IMAGE:
			return {
				...state,
				image: action.payload,
			};
		case UPLOAD_IMAGE:
			return {
				...state,
				image: action.payload,
			};
		case UPDATE_IMAGE:
			return {
				...state,
				image: action.payload,
			};
		case REMOVE_IMAGE:
			return {
				...state,
				image: null,
			};
		case SET_IMAGE:
			return {
				...state,
				image: action.payload,
			};
		default:
			return state;
	};
};

export default imageReducer;