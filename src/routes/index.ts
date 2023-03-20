import { Router } from 'express';
import { router as roomsRouter } from './rooms';
import { router as authRouter } from './authentication';

export const router = Router();

router.use('/rooms', roomsRouter);
router.use('/authentication', authRouter);
