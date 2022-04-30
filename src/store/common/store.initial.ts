import { GAME_FIELD_SIZE } from '../appConfig';
import { AppStore } from './store.types';

const INTI_ENTITY_SIZE = 20;
const INTI_ENTITY_NUMB = 20;
const INIT_ENTITY_LIST = new Array(INTI_ENTITY_NUMB).fill(0).reduce<AppStore['entityList']>((acc, _, index) => {
  const index1 = index + 1;
  const rgbIndex = index1 * 10;
  return {
    ...acc,
    [index1]: {
      id: `${index1}`,
      type: 'ball',
      size: INTI_ENTITY_SIZE,
      color: `rgb(${rgbIndex}, ${rgbIndex}, ${rgbIndex})`,
      vector: {
        x: (GAME_FIELD_SIZE / INTI_ENTITY_NUMB) * index1 - INTI_ENTITY_SIZE,
        y: (GAME_FIELD_SIZE / INTI_ENTITY_NUMB) * index1 - INTI_ENTITY_SIZE,
        directionAngle: 45,
        velocity: 1 * index1,
      },
    },
  };
}, {});

export const APP_STORE_INITIAL: AppStore = {
  simulatedTime: 0,
  entityList: INIT_ENTITY_LIST,
};
