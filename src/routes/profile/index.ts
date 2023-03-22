import { Router } from 'express';
import { changeUsername } from './change-username';

export const router = Router();

router.put('/', changeUsername);