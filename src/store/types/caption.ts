export const UPDATE_CAPTION = "UPDATE_CAPTION";


export interface Caption {
	id: number;
  text: string;
  satisfactory: boolean;
  corrected_text: string;
  image?: string;
};

// initial state
export type CaptionState = {
    caption: Caption | null;
  };
  
  
// actions
interface UpdateCaptionAction {
  type: typeof UPDATE_CAPTION;
  payload: Caption;
};

export type CaptionActionTypes = UpdateCaptionAction
