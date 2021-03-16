import { Reducer } from 'redux';
import { 
	GET_PUBLIC_IMAGES, 
	GET_PRIVATE_IMAGES, 
	ImagesState, 
	ImagesActionTypes 
} from '../types/images';


const initialState: ImagesState = {
  images: [],
};

export const imagesReducer: Reducer<ImagesState, ImagesActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case GET_PUBLIC_IMAGES:
			return {
				...state,
				images: action.payload,
			};
		case GET_PRIVATE_IMAGES:
			return {
				...state,
				images: action.payload,
			};
		default:
			return state;
	};
};