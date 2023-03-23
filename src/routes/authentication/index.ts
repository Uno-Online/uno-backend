import { Router } from 'express';
import { register } from './register';
import { logout } from './logout';

export const router = Router();

router.post('/register', register);
router.put('/logout', logout);
