import { Router, Request, Response } from 'express';
import { AuthenticationController } from '../controllers';

export const router = Router();

const authCtrl = new AuthenticationController();
router.get('/', authCtrl.index);
router.post('/register', (req: Request, res: Response) =>
  authCtrl.register(req, res)
);
