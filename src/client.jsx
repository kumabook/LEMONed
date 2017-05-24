/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
import 'babel-polyfill';
import 'url-search-params-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route } from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware,
} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers';
import rootSaga from './sagas';

import App from './containers/App';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ArtistList from './containers/ArtistList';
import TrackList from './containers/TrackList';

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));
const store = createStore(
  reducers,
  middleware,
);
injectTapEventPlugin();
sagaMiddleware.run(rootSaga);
render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/artists" component={ArtistList} />
          <Route exact path="/tracks" component={TrackList} />
        </App>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('container'),
);
