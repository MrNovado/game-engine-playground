import { Reducer } from 'redux';
import { AppEvents, AppStore, APP_STORE_INITIAL } from '../common';
import { entityUpdateCase } from './entityUpdateCase';

export const entityListReducer: Reducer<AppStore['entityList'], AppEvents> = (
  entityList = APP_STORE_INITIAL.entityList,
  event,
) => {
  switch (event.type) {
    case '@engine/flow/tick': {
      return entityUpdateCase(entityList, event);
    }

    default: {
      return entityList;
    }
  }
};
