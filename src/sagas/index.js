import { Effect } from 'redux-saga/effects';
import {
  call,
  fork,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import track from '../api/track';

function* fetchTracks(): Iterable<Effect> {
  try {
    const user = yield call(track.index, 1, 10);
    yield put({ type: "TRACKS_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "TRACKS_FETCH_FAILED", message: e.message });
  }
}

export default function* root(): IterableIterator<Effect> {
  yield* [takeEvery("TRACKS_FETCH", fetchTracks)];
}

