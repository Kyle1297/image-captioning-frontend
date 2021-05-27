import { Reducer } from 'redux';
import {
	GET_IMAGES,
	ImagesState,
	ImagesActionTypes,
	SET_IMAGE_IN_IMAGES,
	EXTEND_IMAGES,
	SET_IMAGE_FILTER,
	SET_CAPTION_IN_IMAGES,
} from '../types/image';

const initialState: ImagesState = {
	images: [],
	nextPage: null,
	count: 0,
	newFilter: true,
};

const imagesReducer: Reducer<ImagesState, ImagesActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_IMAGES:
			if (action.payload.newFilter)
				return {
					...state,
					images: [...action.payload.images],
					nextPage: action.payload.nextPage,
					count: action.payload.count,
					newFilter: false,
				};
			else
				return {
					...state,
					images: [...state.images, ...action.payload.images],
					nextPage: action.payload.nextPage,
					count: action.payload.count,
					newFilter: false,
				};
		case SET_IMAGE_IN_IMAGES:
			return {
				...state,
				images: state.images.map((image) => {
					if (image.uuid === action.payload.uuid) return action.payload;
					return image;
				}),
			};
		case SET_CAPTION_IN_IMAGES:
			return {
				...state,
				images: state.images.map((image) => {
					if (image.caption.id === action.payload.id)
						return {
							...image,
							caption: action.payload,
						};
					return image;
				}),
			};
		case EXTEND_IMAGES:
			return {
				...state,
				images: [action.payload, ...state.images],
				count: state.count + 1,
			};
		case SET_IMAGE_FILTER:
			return {
				...state,
				newFilter: action.payload,
			};
		default:
			return state;
	}
};

export default imagesReducer;
