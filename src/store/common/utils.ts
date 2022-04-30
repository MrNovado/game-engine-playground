import { ENGINE_SIMULATED_TIME_PER_TICK } from '../appConfig';
import { Entity } from './store.types';

export const getSimulatedTimeFreq = (entityList: Record<string, Entity>): number => {
  const simulatedTimeFreq = Object.entries(entityList).reduce((acc, [, entry]) => {
    const freq = entry.vector.velocity / ENGINE_SIMULATED_TIME_PER_TICK;
    return freq > acc ? freq : acc;
  }, 0);

  return simulatedTimeFreq;
};
