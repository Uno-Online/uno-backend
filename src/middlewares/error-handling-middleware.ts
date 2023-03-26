import { ErrorRequestHandler, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

const errorHandlingMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json(err.message);
  }

  return res.sendStatus(500);
};

export default errorHandlingMiddleware;
