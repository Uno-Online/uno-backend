import { Router } from 'express';
import { router as roomsRouter } from './rooms';
import {Auth} from "../middewares";

export const router = Router();
const authHandler = new Auth();

router.use('/rooms', roomsRouter);
router.get('/test', authHandler.Handle, (req,res)=>{
    res.send("teste")
});
