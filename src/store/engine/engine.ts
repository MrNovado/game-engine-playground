import { delay, put } from 'redux-saga/effects';

import { AppEvents } from '../common';
import { ENGINE_UPDATE_TICK } from '../appConfig';

export function* engine(): Generator {
  while (true) {
    yield put<AppEvents>({ type: '@engine/flow/tick' });
    yield delay(ENGINE_UPDATE_TICK);
  }
}
