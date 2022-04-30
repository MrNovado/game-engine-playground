import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppEvents, AppStore } from './common';

import { rootReducer } from './appReducer';
import { rootSaga } from './appSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore<AppStore, AppEvents, unknown, unknown>(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
