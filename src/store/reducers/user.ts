import { Reducer } from 'redux';
import { 
	GET_USER, 
	CREATE_USER,
	UPDATE_USER,
	REMOVE_USER,
	UserState, 
	UserActionTypes, 
} from '../types/user';


const initialState: UserState = {
  user: null,
};

const userReducer: Reducer<UserState, UserActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				user: action.payload,
			};
		case CREATE_USER:
			return {
				...state,
				user: action.payload,
			};
		case UPDATE_USER:
			return {
				...state,
				user: action.payload,
			};
		case REMOVE_USER:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	};
};

export default userReducer;