import { Request, Response } from 'express';

/**
 * Retorna informações sobre o usuário logado
 * */
export const getUserLogged = async (req: Request, res: Response) => {
  const userLogged = {
    id: req.user?.id,
    username: req.user?.username,
    email: req.user?.email,
  };

  return res.json(userLogged);
};
