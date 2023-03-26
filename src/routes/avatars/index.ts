import { Router } from 'express';
import { generateUserIconSvg } from './avatar.generator';

export const router = Router();

router.get('/', generateUserIconSvg);
