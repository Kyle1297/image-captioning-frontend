import { combineReducers } from 'redux';
import imagesReducer  from './images';
import collectionsReducer from './collections';
import requestsReducer from './requests';
import imageReducer from './image';
import collectionReducer from './collection';
import captionReducer from './caption';
import commentReducer from './comment';
import userReducer from './user';


const rootReducer = combineReducers({
  image: imageReducer,
  images: imagesReducer,
  collection: collectionReducer,
  collections: collectionsReducer,
  caption: captionReducer,
  comment: commentReducer,
  user: userReducer,
  requests: requestsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;