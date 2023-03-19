import { Router } from 'express';
import { RoomController } from '../controllers';

export const router = Router();

const roomCtrl = new RoomController();

router.get('/', roomCtrl.index);
router.get('/:id', roomCtrl.getById);
