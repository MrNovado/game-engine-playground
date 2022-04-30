import { AppStore } from './store.types';

const INTI_ENTITY_NUMB = 20;
const INIT_ENTITY_LIST = new Array(INTI_ENTITY_NUMB).fill(0).reduce<AppStore['entityList']>((acc, _, index) => {
  const index1 = index + 1;
  const rgbIndex = index1 * 10;
  return {
    ...acc,
    [index1]: {
      id: `${index1}`,
      type: 'ball',
      size: 20,
      color: `rgb(${rgbIndex}, ${rgbIndex}, ${rgbIndex})`,
      vector: {
        x: 25 * index1,
        y: 25 * index1,
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
