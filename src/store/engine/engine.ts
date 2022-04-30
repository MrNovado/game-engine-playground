import { delay, put } from 'redux-saga/effects';
import { AppEvents, ENGINE_UPDATE_TICK } from '../common';

export function* engine(): Generator {
  while (true) {
    yield delay(ENGINE_UPDATE_TICK);
    yield put<AppEvents>({ type: '@engine/flow/tick' });
  }
}
