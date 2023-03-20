import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma';
import type { Middleware } from '../types';

export class Auth implements Middleware {

    public  async Handle(req: Request, res: Response, next: NextFunction){
        if (req.cookies) {
            res.send("Sem cookie")
            return
        }
        console.log("cookies: ",JSON.stringify(req.cookies))
        next()
    }
}