
import type { Request } from 'express';

export interface TypedBodyRequest<T> extends Request{
    body:T
}