export const UPDATE_CAPTION = 'UPDATE_CAPTION';
export const SET_CAPTION = 'SET_CAPTION';

export interface Caption {
	id: number;
	text: string;
	satisfactory: boolean | null;
	corrected_text: string;
	image?: string;
	last_updated: string;
}

export interface CaptionPatch {
	satisfactory?: boolean | null;
	corrected_text?: string;
}

export interface CaptionPost {
	text: string;
}

// initial state
export type CaptionState = {
	caption: Caption | null;
};

// actions
interface UpdateCaptionAction {
	type: typeof UPDATE_CAPTION;
	payload: Caption;
}

interface SetCaptionAction {
	type: typeof SET_CAPTION;
	payload: Caption | null;
}

export type CaptionActionTypes = UpdateCaptionAction | SetCaptionAction;
