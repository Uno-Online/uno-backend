import { Router } from 'express';
import { register } from './register';
import { login } from './login';
import { logout } from './logout';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.put('/logout', logout);
