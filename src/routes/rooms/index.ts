import { Router } from 'express';
import { getRoomById } from './get-room-by-id';
import { getRooms } from './get-rooms';
import { deleteRoomById } from './delete-room-by-id';

export const router = Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.delete('/:id', deleteRoomById);
