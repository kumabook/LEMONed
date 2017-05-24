import {
  fork,
} from 'redux-saga/effects';
import {
  watchFetchTracks,
  watchCreateTrack,
  watchUpdateTrack,
  watchDestroyTrack,
} from './track';
import {
  watchFetchArtists,
  watchCreateArtist,
  watchUpdateArtist,
  watchDestroyArtist,
} from './artist';
import routerSaga from './router';

export default function* root() {
  yield [
    fork(watchFetchArtists),
    fork(watchCreateArtist),
    fork(watchUpdateArtist),
    fork(watchDestroyArtist),

    fork(watchFetchTracks),
    fork(watchCreateTrack),
    fork(watchUpdateTrack),
    fork(watchDestroyTrack),
    fork(routerSaga),
  ];
}

