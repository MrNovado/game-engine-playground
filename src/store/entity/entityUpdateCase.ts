import { Reducer } from 'redux';
import { ENGINE_SIMULATED_TIME_PER_TICK, GAME_FIELD_SIZE } from '../appConfig';
import { AppEvents, AppStore, APP_STORE_INITIAL, Entity } from '../common';

export const entityUpdateCase: Reducer<AppStore['entityList'], Extract<AppEvents, { type: '@engine/flow/tick' }>> = (
  entityList = APP_STORE_INITIAL.entityList,
  event,
) => {
  const simulatedTimePerTick = event.simulatedTimeOverride || ENGINE_SIMULATED_TIME_PER_TICK;

  const updatedEntities = Object.entries<Entity>(entityList).reduce<Record<string, Entity>>((acc, [id, entity]) => {
    let newX = entity.vector.x + entity.vector.velocity * simulatedTimePerTick;
    let newVelocity = entity.vector.velocity;

    const rightBoundary = GAME_FIELD_SIZE - entity.size;
    if (newX >= rightBoundary) {
      newX = rightBoundary - (newX - rightBoundary);
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
  }, {});

  return updatedEntities;
};
