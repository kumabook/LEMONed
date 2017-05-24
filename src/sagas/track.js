import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import api from '../api/track';
import {
  showProgress,
  hideProgress,
  showMessage,
} from '../actions/app';
import {
  index,
  create,
  update,
  destroy,
  creators,
} from '../actions/track';

export function* fetchTracks({ payload: { page = 1, perPage = 10 } }) {
  try {
    const items = yield call(api.index, page, perPage);
    yield put(creators.index.success(items));
  } catch (e) {
    yield put(creators.index.failure(e));
    yield put(showMessage(e.message));
  }
}

export function* watchFetchTracks() {
  yield takeEvery(index.start, fetchTracks);
}

function* createTrack({ payload }) {
  try {
    yield put(showProgress());
    const item = yield call(api.create, payload);
    yield put(creators.create.success(item));
    yield put(creators.index.start({ page: 1, perPage: 10 }));
  } catch (e) {
    yield put(creators.create.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchCreateTrack() {
  yield takeEvery(create.start, createTrack, {});
}

export function* updateTrack({ payload }) {
  try {
    yield put(showProgress());
    const item = yield call(api.update, payload);
    yield put(creators.update.success(item));
    yield put(creators.index.start({ page: 1, perPage: 10 }));
  } catch (e) {
    yield put(creators.update.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchUpdateTrack() {
  yield takeEvery(update.start, updateTrack);
}

function* destroyTrack({ payload }) {
  try {
    yield put(showProgress());
    const result = yield call(api.destroy, payload);
    yield put(creators.destroy.success(result));
    yield put(creators.index.start({ page: 1, perPage: 10 }));
  } catch (e) {
    yield put(creators.destroy.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchDestroyTrack() {
  yield takeEvery(destroy.start, destroyTrack);
}
