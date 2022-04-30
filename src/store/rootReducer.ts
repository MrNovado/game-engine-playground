import { Reducer } from 'redux';
import { AppEvents, AppStore, APP_STORE_INITIAL } from './common';

export const rootReducer: Reducer<AppStore, AppEvents> = (state = APP_STORE_INITIAL) => {
  return state;
};
