import { Router } from 'express';
import { register } from './register';
import { login } from './login';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
