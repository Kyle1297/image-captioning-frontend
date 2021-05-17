import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes } from './actionUtils';
import {
	UPDATE_CAPTION,
	CaptionPatch,
	Caption,
	SET_CAPTION,
} from '../types/caption';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/captions';

// UPDATE CAPTION
export const updateCaption = (id: number, data: CaptionPatch) => (
	dispatch: Dispatch
) => {
	requestHelper({
		dispatch: dispatch,
		requestName: RequestEnums.updateCaption,
		actionType: UPDATE_CAPTION,
		requestConfig: {
			url: `${API_SERVER}/${id}/`,
			method: MethodTypes.PATCH,
			data: data,
		},
	});
};

// SET CAPTION
export const setCaption = (caption: Caption | null) => ({
	type: SET_CAPTION,
	payload: caption,
});
