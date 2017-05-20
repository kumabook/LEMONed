/* global flashMessage, title, isLoggedIn */
const initialState = {
  drawlerIsOpen: false,
  message:       flashMessage || '',
  title:         title || '',
  isLoggedIn:    isLoggedIn || false,
};

export default (state = initialState, action) => {
  if (action.type === 'TOGGLE_DRAWLER') {
    return {
      drawlerIsOpen: !state.drawlerIsOpen,
      message:       state.message,
      title:         state.title,
      isLoggedIn:    state.isLoggedIn,
    };
  }
  if (action.type === 'CLOSE_MESSAGE') {
    return {
      drawlerIsOpen: state.drawlerIsOpen,
      message:       '',
      title:         state.title,
      isLoggedIn:    state.isLoggedIn,
    };
  }
  return state;
};
