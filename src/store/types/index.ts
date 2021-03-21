import { ImagesActionTypes, ImageActionTypes } from './image';
import { CollectionActionTypes, CollectionsActionTypes } from './collection';
import { RequestsActionTypes } from './request';
import { CaptionActionTypes } from './caption';
import { UserActionTypes } from './user';
import { CommentActionTypes } from './comment';
import { Caption } from '../types/caption';
import { Collection } from '../types/collection';
import { Comment } from '../types/comment';
import { Image } from '../types/image';
import { User } from '../types/user';


export type AppActions = ImagesActionTypes | CollectionsActionTypes | 
												 UserActionTypes | CaptionActionTypes | 
												 RequestsActionTypes | CollectionActionTypes |
												 ImageActionTypes | CommentActionTypes;


export type AppModels = Caption | Collection | Comment | Image | User