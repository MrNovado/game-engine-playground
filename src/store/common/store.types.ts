export type Entity = {
  id: string;
  type: 'ball';
  radius: number;
  color: string;
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
