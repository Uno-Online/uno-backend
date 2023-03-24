import type { Response } from 'express';
import { RequestWithUser } from '../../types/request-with-user';

/**
 * Retorna informações sobre o usuário logado
 * */
export const getUserLogged = async (req: RequestWithUser, res: Response) => {
  const userLogged = {
    id: req.user?.id,
    username: req.user?.username,
    email: req.user?.email,
  };

  return res.json(userLogged);
};
