import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '../prisma';
import regiterBodyDto, { RegisterBodyType } from '../dtos/RegisterBodyDTO';
import type { Controller } from '../types';
import { TypedBodyRequest } from '../types/typedBody';
import { JWTAdapter } from '../adapters/jwt_adapter';

export class AuthenticationController implements Controller {
  private hi = 'hello';

  private jwt = new JWTAdapter(process.env!.JWT_SECRET!);

  async index(req: Request, res: Response) {
    res.send('bruh');
  }

  async register(req: TypedBodyRequest<RegisterBodyType>, res: Response) {
    const body = regiterBodyDto.safeParse(req.body);
    if (!body.success) {
      res.status(400).send('Invalid register request body');
      return;
    }

    const { data } = body;
    const checkDb = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });
    if (checkDb !== null) {
      res.status(400).send('Username or email already in use');
      return;
    }
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: await bcrypt.hash(data.password, 12),
      },
    });

    const JWT_CLIENT = this.jwt.encrypt({ userid: user.id });

    await prisma.userSession.create({
      data: {
        token: JWT_CLIENT,
        userId: user.id,
      },
    });
    res.cookie('auth_token', JWT_CLIENT, {
      httpOnly: true,
    });
    res.send({
      success: true,
    });
  }
}
