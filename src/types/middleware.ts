import type {Request, Response, NextFunction} from 'express';

export interface Middleware {
    Handle(req: Request, res:Response, next: NextFunction):unknown;
}