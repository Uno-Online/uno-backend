import { Router } from 'express';
import { getUserLogged } from './get-user-logged';

export const router = Router();

router.get('/profile', getUserLogged);
