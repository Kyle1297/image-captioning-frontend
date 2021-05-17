import { User } from './auth';
import { Caption, CaptionPost } from './caption';
import { Collection } from './collection';

export const GET_IMAGES = 'GET_IMAGES';
export const SET_IMAGE_IN_IMAGES = 'SET_IMAGE_IN_IMAGES';
export const EXTEND_IMAGES = 'EXTEND_IMAGES';
export const GET_IMAGE = 'GET_IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const CREATE_IMAGE = 'CREATE_IMAGE';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const SET_IMAGE = 'SET_IMAGE';
export const SET_IMAGE_FILTER = 'SET_IMAGE_FILTER';

export interface Image {
	uuid: string;
	caption: Caption;
	comments_count: number;
	collections: Collection[];
	uploader: User;
	s3_key: string;
	type: string;
	image: string;
	width: number;
	height: number;
	title: string;
	uploaded_at: string;
	is_profile_image: boolean;
	is_private: boolean;
	likes: User['id'][];
	dislikes: User['id'][];
	views: number;
	downloads: number;
}

export enum ImageReportTypes {
	LEGAL = 'Infringes my rights',
	VIOLENT = 'Violent or repulsive',
	HATEFUL = 'Hateful or abusive',
	SEXUAL = 'Sexually explicit material',
	SPAM = 'Spam or misleading',
	HARASSMENT = 'Bullying or harassment',
	CAPTION = 'Caption issue',
	OTHER = 'Other',
}

export interface ImageReport {
	user: User['id'];
	type: string;
}

export interface ImagePatch {
	caption?: Caption['id'];
	collection_ids?: number[];
	title?: string;
	is_profile_image?: boolean;
	is_private?: boolean;
	likes?: User['id'][];
	dislikes?: User['id'][];
	report?: ImageReport;
	views?: number;
	downloads?: number;
}

interface ImageUploaderPost {
	id: number;
}

export interface ImagePost {
	uuid: string;
	uploader: ImageUploaderPost | null;
	image?: File | null;
	collection_ids?: number[];
	title: string;
	is_profile_image: boolean;
	is_private: boolean;
	width: number;
	height: number;
	caption?: CaptionPost;
	type: string;
}

// initial states
export type ImagesState = {
	images: Image[];
	nextPage: number | null;
	count: number;
	newFilter: boolean;
};

export type ImageState = {
	image: Image | null | undefined;
};

// actions
interface GetImagesAction {
	type: typeof GET_IMAGES;
	payload: ImagesState;
}

interface ExtendImagesAction {
	type: typeof EXTEND_IMAGES;
	payload: Image;
}

interface GetImageAction {
	type: typeof GET_IMAGE;
	payload: Image;
}

interface UploadImageAction {
	type: typeof UPLOAD_IMAGE;
}

interface CreateImageAction {
	type: typeof CREATE_IMAGE;
	payload: Image;
}

interface UpdateImageAction {
	type: typeof UPDATE_IMAGE;
	payload: Image;
}

interface RemoveImageAction {
	type: typeof REMOVE_IMAGE;
}

interface SetImageAction {
	type: typeof SET_IMAGE;
	payload: Image;
}

interface SetImageInImagesAction {
	type: typeof SET_IMAGE_IN_IMAGES;
	payload: Image;
}

interface SetImageFilterAction {
	type: typeof SET_IMAGE_FILTER;
	payload: ImagesState['newFilter'];
}

export type ImagesActionTypes =
	| GetImagesAction
	| SetImageFilterAction
	| SetImageInImagesAction
	| ExtendImagesAction;

export type ImageActionTypes =
	| GetImageAction
	| SetImageAction
	| UploadImageAction
	| CreateImageAction
	| UpdateImageAction
	| RemoveImageAction;

// filters
export interface ImageFilters {
	page?: number;
	is_profile_image?: boolean;
	is_private?: boolean;
	uploader?: User['id'];
	collections?: string[] | string;
	search?: string;
	liked?: User['id'];
}
