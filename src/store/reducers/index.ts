import { combineReducers } from 'redux';
import { imagesReducer }  from './images';


const rootReducer = combineReducers({
  images: imagesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;