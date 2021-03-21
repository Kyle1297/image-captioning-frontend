import { Reducer } from 'redux';
import { 
	GET_IMAGES,
	ImagesState, 
	ImagesActionTypes 
} from '../types/image';


const initialState: ImagesState = {
  images: [],
  nextPage: null,
  count: 0,
  start: true,
};

const imagesReducer: Reducer<ImagesState, ImagesActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case GET_IMAGES:
			return {
				...state,
				images: [...state.images, ...action.payload.images],
				nextPage: action.payload.nextPage,
				count: action.payload.count,
				start: false,
			};
		default:
			return state;
	};
};

export default imagesReducer;