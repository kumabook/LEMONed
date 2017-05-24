import { LOCATION_CHANGE } from 'react-router-redux';
import { delay } from 'redux-saga';
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { defaultPerPage, delayMSForDebounce } from '../config';
import {
  showProgress, hideProgress } from '../actions/app';
import { creators as artistActions } from '../actions/artist';
import { creators as trackActions } from '../actions/track';

function* locationChanged({ payload }) {
  yield put(showProgress());
  yield call(delay, delayMSForDebounce);
  yield put(hideProgress());
  const query   = new URLSearchParams(payload.search);
  const page    = parseInt(query.get('page'), 10) || 0;
  const perPage = parseInt(query.get('per_page'), 10) || defaultPerPage;
  switch (payload.pathname) {
    case '/artists':
      yield put(artistActions.index.start({ page, perPage }));
      break;
    case '/tracks':
      yield put(trackActions.index.start({ page, perPage }));
      break;
    default:
      break;
  }
}

export default function* watchLocationChange() {
  yield takeLatest(LOCATION_CHANGE, locationChanged);
}
