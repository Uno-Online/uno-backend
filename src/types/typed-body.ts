import { Request } from 'express';

export default interface TypedBody<T> extends Request {
  body: T;
}
