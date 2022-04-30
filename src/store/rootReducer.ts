import { Reducer } from 'redux';
import { AppEvents, AppStore, APP_STORE_INITIAL, Entity, GAME_FIELD_SIZE } from './common';

export const rootReducer: Reducer<AppStore, AppEvents> = (state = APP_STORE_INITIAL, event) => {
  switch (event.type) {
    case '@engine/flow/tick': {
      const updatedEntities = Object.entries<Entity>(state.entityList).reduce<Record<string, Entity>>(
        (acc, [id, entity]) => {
          let newX = entity.vector.x + entity.vector.velocity / state.engineUpdateFrequency;
          let newVelocity = entity.vector.velocity;

          const rightBoundary = GAME_FIELD_SIZE - entity.size;
          if (newX >= rightBoundary) {
            newX = GAME_FIELD_SIZE - (GAME_FIELD_SIZE - newX);
            newVelocity = newVelocity > 0 ? newVelocity * -1 : newVelocity;
          }

          const leftBoundary = 0;
          if (newX <= leftBoundary) {
            newX *= -1;
            newVelocity = newVelocity < 0 ? newVelocity * -1 : newVelocity;
          }

          return {
            ...acc,
            [id]: {
              ...entity,
              vector: {
                ...entity.vector,
                x: newX,
                velocity: newVelocity,
              },
            },
          };
        },
        {},
      );

      return {
        ...state,
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
