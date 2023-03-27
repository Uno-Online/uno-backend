import { Router } from 'express';
import { changeUsername } from './change-username';
import { getUserLogged } from './get-user-logged';
import { updateAvatar } from './update-avatar';

export const router = Router();

router.put('/', updateAvatar);
router.put('/username/', changeUsername);
router.get('/', getUserLogged);
