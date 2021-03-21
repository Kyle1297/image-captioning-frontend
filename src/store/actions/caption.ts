import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import { 
	UPDATE_CAPTION,
	Caption, 
} from '../types/caption';


const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/captions';

// UPDATE CAPTION
export const updateCaption = (id: number, data: Caption) => (dispatch: Dispatch) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateCaption,
		requestURL: `${API_SERVER}/${id}/`,
		requestMethod: MethodTypes.PATCH,
		actionType: UPDATE_CAPTION,
		requestParams: {
			data: data,
		},
	});
};