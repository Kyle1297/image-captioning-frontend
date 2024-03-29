import { Reducer } from 'redux';
import {
	GET_COLLECTIONS,
	CollectionsState,
	CollectionsActionTypes,
	EXTEND_COLLECTIONS,
} from '../types/collection';

const initialState: CollectionsState = {
	collections: [],
};

const collectionsReducer: Reducer<CollectionsState, CollectionsActionTypes> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case GET_COLLECTIONS:
			return {
				...state,
				collections: action.payload,
			};
		case EXTEND_COLLECTIONS:
			return {
				...state,
				collections: [...state.collections, action.payload],
			};
		default:
			return state;
	}
};

export default collectionsReducer;
