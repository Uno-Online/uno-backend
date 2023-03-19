import type { Request, Response } from 'express';

export interface Controller {
  index(req: Request, res: Response): unknown;
  getById(req: Request, res: Response): unknown;
}
