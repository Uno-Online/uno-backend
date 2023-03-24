import { Router } from 'express';
import { getUserById } from './get-user-by-id';

export const router = Router();

router.get('/:id', getUserById);
