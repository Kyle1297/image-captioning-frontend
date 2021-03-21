export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';


export interface Request {
	name: number;
	isLoading: boolean;
	error?: object | null;
};

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
  updateImage,
  removeImage,
  setImage,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getComment,
  createComment,
  updateComment,
  removeComment,
  updateCaption,
};


// initial state
export type RequestsState = {
  requests: Request[];
};


// actions
interface RequestStartedAction {
  type: typeof REQUEST_STARTED;
  payload: Request;
};

interface RequestSuccessAction {
  type: typeof REQUEST_SUCCESS;
  payload: Request;
};

interface RequestErrorAction {
  type: typeof REQUEST_ERROR;
  payload: Request;
};

export type RequestsActionTypes = RequestStartedAction | RequestSuccessAction | RequestErrorAction