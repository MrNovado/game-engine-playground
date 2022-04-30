import { AppStore, Entity } from './store.types';

const INIT_ENTITY_1: Entity = {
  id: '1',
  type: 'ball',
  radius: 5,
  color: 'white',
  vector: {
    x: 100,
    y: 100,
    directionAngle: 320,
    velocity: 5,
  },
};

const INIT_ENTITY_2: Entity = {
  id: '2',
  type: 'ball',
  radius: 5,
  color: 'green',
  vector: {
    x: 200,
    y: 200,
    directionAngle: 45,
    velocity: 3,
  },
};

export const APP_STORE_INITIAL: AppStore = {
  entityList: {
    [INIT_ENTITY_1.id]: INIT_ENTITY_1,
    [INIT_ENTITY_2.id]: INIT_ENTITY_2,
  },
};
