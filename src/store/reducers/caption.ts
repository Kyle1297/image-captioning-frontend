import { Reducer } from 'redux';
import { 
	UPDATE_CAPTION,
	CaptionState, 
	CaptionActionTypes, 
} from '../types/caption';


const initialState: CaptionState = {
  caption: null,
};

const captionReducer: Reducer<CaptionState, CaptionActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CAPTION:
			return {
				...state,
				caption: action.payload,
			};
		default:
			return state;
	};
};

export default captionReducer;