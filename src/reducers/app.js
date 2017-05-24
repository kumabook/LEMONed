/* global flashMessage, title, isLoggedIn */

import { combineReducers } from 'redux';

const drawlerIsOpen = (state = false, action) => {
  if (action.type === 'TOGGLE_DRAWLER') {
    return !state;
  }
  return state;
};

const progress = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_PROGRESS':
      return true;
    case 'HIDE_PROGRESS':
      return false;
    default:
      return state;
  }
};

const message = (state = flashMessage || '', action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return action.payload;
    case 'CLOSE_MESSAGE':
      return '';
    default:
      return state;
  }
};

const titleReducer = (state = title || '') => state;
const isLoggedInReducer = (state = isLoggedIn) => state;

export default combineReducers({
  drawlerIsOpen,
  message,
  progress,
  title:      titleReducer,
  isLoggedIn: isLoggedInReducer,
});
