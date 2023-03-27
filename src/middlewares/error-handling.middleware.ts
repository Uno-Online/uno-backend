import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpException from '../exceptions/http-exception';

const errorHandlingMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message });
  }
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ success: false, errors: JSON.parse(err.message) });
  }

  return res.sendStatus(500);
};

export default errorHandlingMiddleware;
