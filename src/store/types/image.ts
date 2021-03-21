import { User } from './user';
import { Caption } from './caption';
import { Comment } from './comment';
import { Collection } from './collection';


export const GET_IMAGES = 'GET_IMAGES';
export const GET_IMAGE = 'GET_IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const SET_IMAGE = 'SET_IMAGE';

export interface Image {
	uuid: string;
	caption: Caption;
	comments: Comment[];
	collections: Collection[];
	uploader: User;
	image: string;
	title: string;
	uploaded_at: Date;
	is_profile_image: boolean;
	is_private: boolean;
	likes: User[];
	dislikes: User[];
};


// initial states
export type ImagesState = {
  images: Image[];
  nextPage: number | null;
  count: number;
  start: boolean;
};

export type ImageState = {
	image: Image | null;
};


// actions
interface GetImagesAction {
  type: typeof GET_IMAGES;
  payload: ImagesState;
};

interface GetImageAction {
	type: typeof GET_IMAGE;
	payload: Image;
  };
  
interface UploadImageAction {
	type: typeof UPLOAD_IMAGE;
	payload: Image;
};

interface UpdateImageAction {
	type: typeof UPDATE_IMAGE;
	payload: Image;
};

interface RemoveImageAction {
	type: typeof REMOVE_IMAGE;
};

interface SetImageAction {
	type: typeof SET_IMAGE;
	payload: Image;
};

export type ImagesActionTypes = GetImagesAction

export type ImageActionTypes = GetImageAction | UploadImageAction | UpdateImageAction | RemoveImageAction | SetImageAction;