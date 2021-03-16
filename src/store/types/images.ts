import { Caption } from './caption';


export const GET_PUBLIC_IMAGES = 'GET_PUBLIC_IMAGES';
export const GET_PRIVATE_IMAGES = 'GET_PRIVATE_IMAGES';

// default image properties
export interface Image {
	uuid: string;
	caption: Caption;
	image: string;
	title: string;
	uploaded_at: Date;
	is_profile_image: boolean;
	is_private: boolean;
	user: number;
	collections: string[];
};


// initial state
export type ImagesState = {
  images: Image[];
};


// actions
interface GetPublicImagesAction {
  type: typeof GET_PUBLIC_IMAGES;
  payload: Image[];
};

interface GetPrivateImagesAction {
	type: typeof GET_PRIVATE_IMAGES;
	payload: Image[];
  };

export type ImagesActionTypes = GetPublicImagesAction | GetPrivateImagesAction
