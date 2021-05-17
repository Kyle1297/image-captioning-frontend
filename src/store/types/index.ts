import { RequestsActionTypes } from './request';
import {
	CaptionActionTypes,
	Caption,
	CaptionPatch,
	CaptionPost,
} from './caption';
import { AuthActionTypes, UserPatch } from './auth';
import {
	CommentActionTypes,
	Comment,
	CommentPatch,
	CommentPost,
	CommentFilters,
	CommentsActionTypes,
} from './comment';
import { User } from './auth';
import { AlertActionTypes } from './alert';
import { LoginActionTypes } from './login';
import {
	CollectionActionTypes,
	CollectionFilters,
	CollectionsActionTypes,
	CollectionPost,
	Collection,
} from './collection';
import {
	ImagesActionTypes,
	ImageActionTypes,
	ImageFilters,
	ImagePatch,
	ImagePost,
	Image,
} from './image';

export type AppActions =
	| ImagesActionTypes
	| CollectionsActionTypes
	| AuthActionTypes
	| CaptionActionTypes
	| RequestsActionTypes
	| CollectionActionTypes
	| ImageActionTypes
	| CommentActionTypes
	| CommentsActionTypes
	| AlertActionTypes
	| LoginActionTypes;

export type AppModels = Caption | Collection | Comment | Image | User;

export type AppFilters = CollectionFilters | ImageFilters | CommentFilters;

export type AppPatch = ImagePatch | CaptionPatch | CommentPatch | UserPatch;

export type AppPost = CollectionPost | ImagePost | CaptionPost | CommentPost;
