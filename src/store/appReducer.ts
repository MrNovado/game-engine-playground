import { Reducer } from 'redux';
import { AppEvents, AppStore, APP_STORE_INITIAL } from './common';
import { ENGINE_SIMULATED_TIME_PER_TICK } from './appConfig';
import { entityListReducer } from './entity';

export const rootReducer: Reducer<AppStore, AppEvents> = (state = APP_STORE_INITIAL, event) => {
  switch (event.type) {
    case '@engine/flow/tick': {
      const newSimulatedTime = state.simulatedTime + ENGINE_SIMULATED_TIME_PER_TICK;
      const updatedEntities = entityListReducer(state.entityList, event);

      return {
        ...state,
        simulatedTime: newSimulatedTime,
        entityList: {
          ...state.entityList,
          ...updatedEntities,
        },
      };
    }

    default: {
      return state;
    }
  }
};
