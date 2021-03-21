import { Reducer } from 'redux';
import { 
	GET_COLLECTION, 
	CREATE_COLLECTION,
	UPDATE_COLLECTION,
	REMOVE_COLLECTION,
	CollectionState, 
	CollectionActionTypes, 
} from '../types/collection';


const initialState: CollectionState = {
  collection: null,
};

const collectionReducer: Reducer<CollectionState, CollectionActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case GET_COLLECTION:
			return {
				...state,
				collection: action.payload,
			};
		case CREATE_COLLECTION:
			return {
				...state,
				collection: action.payload,
			};
		case UPDATE_COLLECTION:
			return {
				...state,
				collection: action.payload,
			};
		case REMOVE_COLLECTION:
			return {
				...state,
				collection: null,
			};
		default:
			return state;
	};
};

export default collectionReducer;