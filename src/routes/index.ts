import { Router } from 'express';
import { router as roomsRouter } from './rooms';

export const router = Router();

router.use('/rooms', roomsRouter);
