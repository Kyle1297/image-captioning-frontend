export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

interface ProfileErrorData {
	location?: string[];
}

interface ErrorData {
	password?: string[];
	username?: string[];
	email?: string[];
	profile?: ProfileErrorData;
	detail?: string;
	non_field_errors?: string[];
}

export interface ErrorMessage {
	data?: ErrorData | undefined;
}

export interface Request {
	name: number;
	isLoading: boolean;
	error?: ErrorMessage | null | undefined;
}

// request types
export enum RequestEnums {
	getCollections,
	getCollection,
	createCollection,
	updateCollection,
	removeCollection,
	getImages,
	getImage,
	uploadImage,
	createImage,
	updateImage,
	removeImage,
	getUser,
	getPublicUser,
	loginUser,
	registerUser,
	logoutUser,
	updateUser,
	removeUser,
	getComments,
	getComment,
	createComment,
	updateComment,
	removeComment,
	updateCaption,
}

// initial state
export type RequestsState = {
	requests: Request[];
};

// actions
interface RequestStartedAction {
	type: typeof REQUEST_STARTED;
	payload: Request;
}

interface RequestSuccessAction {
	type: typeof REQUEST_SUCCESS;
	payload: Request;
}

interface RequestErrorAction {
	type: typeof REQUEST_ERROR;
	payload: Request;
}

export type RequestsActionTypes =
	| RequestStartedAction
	| RequestSuccessAction
	| RequestErrorAction;
