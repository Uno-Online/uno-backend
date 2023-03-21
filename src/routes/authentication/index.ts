import { Router } from 'express';
import { register } from './register';

export const router = Router();

router.post('/register', register);
