import { Image } from "./image";
import { User } from "./user";


export const GET_COMMENT = 'GET_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


export interface Comment {
    id: number;
    comment: string;
    commenter: User;
    likes: User[];
    dislikes: User[];
    commented_at: Date;
    image?: Image;
};


// initial state
export type CommentState = {
  comment: Comment | null;
};


// actions
interface GetCommentAction {
  type: typeof GET_COMMENT;
  payload: Comment;
};

interface CreateCommentAction {
	type: typeof CREATE_COMMENT;
	payload: Comment;
};

interface UpdateCommentAction {
	type: typeof UPDATE_COMMENT;
	payload: Comment;
};

interface RemoveCommentAction {
	type: typeof REMOVE_COMMENT;
};

export type CommentActionTypes = GetCommentAction | CreateCommentAction | UpdateCommentAction | RemoveCommentAction;
