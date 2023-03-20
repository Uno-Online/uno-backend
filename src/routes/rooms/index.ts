import { Router } from 'express';
import { getRoomById } from './get-room-by-id';
import { getRooms } from './get-rooms';

export const router = Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
