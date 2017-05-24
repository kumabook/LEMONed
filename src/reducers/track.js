import { combineReducers } from 'redux';
import {
  index,
} from '../actions/track';

const total = (state = 0, action) => {
  switch (action.type) {
    case 'FETCH_TRACKS_SUCCEEDED':
      return action.payload.total;
    default:
      return state;
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case index.success:
      return action.payload.items;
    default:
      return state;
  }
};

export default combineReducers({
  total,
  items,
});
