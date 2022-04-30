export type AppEvents =
  | { type: '@app/state/start' }
  | { type: '@engine/flow/resume' }
  | { type: '@engine/flow/pause' }
  | { type: '@engine/flow/tick' };
