import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app';
import track from './track';
import artist from './artist';

const rootReducer = combineReducers({
  app,
  track,
  artist,
  router: routerReducer,
});

export default rootReducer;
