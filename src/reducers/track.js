import { combineReducers } from 'redux';

export const Status = {
  Normal:   'Normal',
  Dirty:    'Dirty',
  Fetching: 'Fetching',
};

const status = (state = Status.Dirty, action) => {
  switch (action.type) {
    case 'FETCH_TRACK':
      return Status.Fetching;
    case 'RECEIVE_TRACK':
      return Status.Normal;
    case 'UPDATE_TRACK':
      return Status.Dirty;
    default:
      return state;
  }
};

const item = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TRACK':
      return action.item;
    default:
      return state;
  }
};

export default combineReducers({
  status,
  item,
});