import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import track from '../api/track';

function* fetchTracks() {
  try {
    const user = yield call(track.index, 1, 10);
    yield put({ type: 'TRACKS_FETCH_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'TRACKS_FETCH_FAILED', message: e.message });
  }
}

export default function* root(){
  yield* [takeEvery("TRACKS_FETCH", fetchTracks)];
}

