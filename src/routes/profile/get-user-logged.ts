import type { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';

/**
 * Retorna informações sobre o usuário logado
 * */
export const getUserLogged = async (req: RequestWithUser, res: Response) =>
  res.json(req.user);
