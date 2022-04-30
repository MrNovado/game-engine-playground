import { spawn } from 'redux-saga/effects';
import { engine } from './engine';

export function* rootSaga(): Generator {
  yield spawn(engine);
}
