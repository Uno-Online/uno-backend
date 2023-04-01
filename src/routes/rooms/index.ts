import { Router } from 'express';
import { createRoom } from './create-room';
import { getRoomById } from './get-room-by-id';
import { getRooms } from './get-rooms';
import { updateRoomNameById } from './update-room-by-id';
import { deleteRoomById } from './delete-room-by-id';

export const router = Router();

router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:id', getRoomById);
router.put('/:id', updateRoomNameById);
router.delete('/:id', deleteRoomById);
