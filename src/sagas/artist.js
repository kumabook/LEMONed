import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import api from '../api/artist';
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
} from '../actions/artist';

export function* fetchArtists({ payload: { page = 0, perPage = 10 } }) {
  try {
    yield put(showProgress());
    const items = yield call(api.index, page, perPage);
    yield put(creators.index.success(items));
  } catch (e) {
    yield put(creators.index.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchFetchArtists() {
  yield takeEvery(index.start, fetchArtists);
}

function* createArtist({ payload }) {
  try {
    yield put(showProgress());
    const item = yield call(api.create, payload);
    yield put(creators.create.success(item));
    yield put(creators.index.start({ page: 0, perPage: 10 }));
  } catch (e) {
    yield put(creators.create.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchCreateArtist() {
  yield takeEvery(create.start, createArtist);
}

export function* updateArtist({ payload }) {
  try {
    yield put(showProgress());
    const item = yield call(api.update, payload);
    yield put(creators.update.success(item));
    yield put(creators.index.start({ page: 0, perPage: 10 }));
  } catch (e) {
    yield put(creators.update.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchUpdateArtist() {
  yield takeEvery(update.start, updateArtist);
}

function* destroyArtist({ payload }) {
  try {
    yield put(showProgress());
    const result = yield call(api.destroy, payload);
    yield put(creators.destroy.success(result));
    yield put(creators.index.start({ page: 0, perPage: 10 }));
  } catch (e) {
    yield put(creators.destroy.failure(e));
    yield put(showMessage(e.message));
  } finally {
    yield put(hideProgress());
  }
}

export function* watchDestroyArtist() {
  yield takeEvery(destroy.start, destroyArtist);
}
