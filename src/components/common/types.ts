import { Image } from '../../store/types/image';

export enum PageTypes {
	HOME,
	IMAGE_DETAILS,
}

// helper function to check that a given object is an Image object
export const instanceOfImage = (object: any): object is Image => {
	return 'uuid' in object;
};
