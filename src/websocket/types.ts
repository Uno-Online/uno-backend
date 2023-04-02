import { SocketError } from '../constants/socket-error';
import * as incomingEvents from './events';

export type IncomingEvents = {
  [K in keyof typeof incomingEvents]: ReturnType<(typeof incomingEvents)[K]>;
};

export type AcknowledgeCallback = (payload: { code: SocketError }) => void;
