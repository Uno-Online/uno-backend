import * as incomingEvents from './events';

export type IncomingEvents = {
  [K in keyof typeof incomingEvents]: ReturnType<(typeof incomingEvents)[K]>;
};
