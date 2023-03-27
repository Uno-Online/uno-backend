import { Router } from 'express';
import { changeUsername } from './change-username';
import { getUserLogged } from './get-user-logged';

export const router = Router();

router.put('/username/', changeUsername);
router.get('/', getUserLogged);
