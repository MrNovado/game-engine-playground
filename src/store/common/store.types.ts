export type Entity = {
  id: string;
  type: 'ball';
  size: number;
  color: string;
  vector: {
    x: number;
    y: number;
    velocity: number;
    directionAngle: number;
  };
};

export type AppStore = {
  simulatedTime: number;
  simulatedTimeFreq: number;
  entityList: Record<string, Entity>;
};
