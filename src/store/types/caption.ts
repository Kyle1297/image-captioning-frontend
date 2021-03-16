export const GET_CAPTION = 'GET_CAPTION';


// default image properties
export interface Caption {
	id: number;
    text: string;
    satisfactory: boolean;
    corrected_text: string;
    image?: string;
    reviewer: number | null;
};


// initial state
export type CaptionState = {
  caption: Caption;
};


// actions
interface GetCaptionAction {
  type: typeof GET_CAPTION;
  payload: Caption;
};

export type CaptionActionTypes = GetCaptionAction
