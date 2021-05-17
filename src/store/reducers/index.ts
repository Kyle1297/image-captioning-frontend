import { combineReducers } from 'redux';
import imagesReducer from './images';
import collectionsReducer from './collections';
import requestsReducer from './requests';
import imageReducer from './image';
import collectionReducer from './collection';
import captionReducer from './caption';
import commentReducer from './comment';
import authReducer from './auth';
import alertReducer from './alert';
import loginReducer from './login';
import commentsReducer from './comments';

const rootReducer = combineReducers({
	image: imageReducer,
	images: imagesReducer,
	collection: collectionReducer,
	collections: collectionsReducer,
	caption: captionReducer,
	comment: commentReducer,
	comments: commentsReducer,
	auth: authReducer,
	requests: requestsReducer,
	alert: alertReducer,
	login: loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
