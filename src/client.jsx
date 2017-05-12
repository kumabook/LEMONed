/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import 'babel-polyfill';
import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push,
} from 'react-router-redux';
import {
  match,
  Router,
  Switch,
  Route,
} from 'react-router';
//import { Link, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers';
import rootSaga from './sagas';

import App from './containers/App';
import TrackList from './containers/TrackList';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const store = createStore(reducers, middleware);
injectTapEventPlugin();
sagaMiddleware.run(rootSaga);
render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Provider store={store}>
      <App>
        <ConnectedRouter history={history}>
          <Route exact component={TrackList} />
        </ConnectedRouter>
      </App>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('container'),
);
