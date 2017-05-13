import { combineReducers } from 'redux';
import app from './app';
import track from './track';

const rootReducer = combineReducers({
  app,
  track,
});

export default rootReducer;
