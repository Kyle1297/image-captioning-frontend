import { Dispatch } from 'redux';
import { RequestEnums } from '../types/request';
import { requestHelper, MethodTypes, authRequestHeaders } from './actionUtils';
import {
	UPDATE_CAPTION,
	CaptionPatch,
	Caption,
	SET_CAPTION,
} from '../types/caption';
import { SET_CAPTION_IN_IMAGES } from '../types/image';
import { AppState } from '../reducers';

const API_SERVER = process.env.REACT_APP_API_SERVER + '/images/captions';

// UPDATE CAPTION
export const updateCaption =
	(id: number, data: CaptionPatch) =>
	(dispatch: Dispatch, getState: () => AppState) => {
		requestHelper({
			dispatch: dispatch,
			requestName: RequestEnums.updateCaption,
			actionType: UPDATE_CAPTION,
			requestConfig: {
				url: `${API_SERVER}/${id}/`,
				method: MethodTypes.PATCH,
				headers: authRequestHeaders(getState().auth.token),
				data: data,
			},
			extraAction: SET_CAPTION_IN_IMAGES,
		});
	};

// SET CAPTION
export const setCaption = (caption: Caption | null) => ({
	type: SET_CAPTION,
	payload: caption,
});
