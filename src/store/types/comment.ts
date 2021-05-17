import { Image } from './image';
import { User } from './auth';

export const GET_COMMENTS = 'GET_COMMENTS';
export const EXTEND_COMMENTS = 'EXTEND_COMMENTS';
export const SET_COMMENT_IN_COMMENTS = 'SET_COMMENT_IN_COMMENTS';
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
	commented_at: string;
	last_edited: string;
	image?: Image['uuid'];
}

export enum CommentReportTypes {
	VIOLENT = 'Violent or repulsive',
	HATEFUL = 'Hateful or abusive',
	SEXUAL = 'Sexually explicit material',
	SPAM = 'Spam or misleading',
	HARASSMENT = 'Bullying or harassment',
	OTHER = 'Other',
}

export interface CommentReport {
	user: User['id'];
	type: string;
}

export interface CommentPatch {
	comment?: string;
	image?: Image['uuid'];
	likes?: User['id'][];
	dislikes?: User['id'][];
	report?: CommentReport;
}

export interface CommentPost {
	comment: string;
	commenter: { id: User['id'] };
	image: Image['uuid'];
}

// initial states
export type CommentsState = {
	comments: Comment[];
	nextPage: number | null;
	count: number;
	newFilter: boolean;
};

export type CommentState = {
	comment: Comment | undefined | null;
};

// actions
interface GetCommentsAction {
	type: typeof GET_COMMENTS;
	payload: CommentsState;
}

interface ExtendCommentsAction {
	type: typeof EXTEND_COMMENTS;
	payload: Comment;
}

interface SetCommentInCommentsAction {
	type: typeof SET_COMMENT_IN_COMMENTS;
	payload: Comment;
}

interface GetCommentAction {
	type: typeof GET_COMMENT;
	payload: Comment;
}

interface CreateCommentAction {
	type: typeof CREATE_COMMENT;
	payload: Comment;
}

interface UpdateCommentAction {
	type: typeof UPDATE_COMMENT;
	payload: Comment;
}

interface RemoveCommentAction {
	type: typeof REMOVE_COMMENT;
}

export type CommentsActionTypes =
	| GetCommentsAction
	| SetCommentInCommentsAction
	| ExtendCommentsAction;

export type CommentActionTypes =
	| GetCommentAction
	| CreateCommentAction
	| UpdateCommentAction
	| RemoveCommentAction;

// filters
export interface CommentFilters {
	page?: number;
	commenter?: User['id'];
	image?: Image['uuid'];
}
