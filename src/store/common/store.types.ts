export type Entity = {
  id: string;
  vector: {
    x: number;
    y: number;
    velocity: number;
    directionAngle: number;
  };
};

export type AppStore = {
  entityList: Record<string, Entity>;
};
