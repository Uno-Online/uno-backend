import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

const errorHandlingMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    res.status(err.status).send(JSON.parse(err.message));

    return next();
  }

  res.sendStatus(500);

  return next();
};

export default errorHandlingMiddleware;
