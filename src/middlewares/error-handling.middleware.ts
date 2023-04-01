import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import HttpException from '../exceptions/http-exception';

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction
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

  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: err.message });
};
