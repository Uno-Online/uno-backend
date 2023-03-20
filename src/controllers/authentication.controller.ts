import type { Response } from 'express';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

import { prisma } from '../prisma';
import regiterBodyDto, { RegisterBody } from '../dtos/RegisterBodyDTO';
import type { Controller } from '../types';
import { TypedBodyRequest } from '../types/typedBody';
import { JWTAdapter } from '../adapters/jwt_adapter';
import { SALT_ROUNDS } from '../constants';

export class AuthenticationController implements Controller {
  private jwt = new JWTAdapter(process.env!.JWT_SECRET!);

  async index() {
    throw new Error();
  }

  async register(req: TypedBodyRequest<RegisterBody>, res: Response) {
    const body = regiterBodyDto.safeParse(req.body);
    if (!body.success) {
      res.status(400).send('Invalid register request body');
      return;
    }

    const { data } = body;
    prisma.user
      .create({
        data: {
          username: data.username,
          email: data.email,
          passwordHash: await bcrypt.hash(data.password, SALT_ROUNDS),
        },
      })
      .then(async (user) => {
        const jwtClient = this.jwt.encrypt({ userid: user.id });

        await prisma.userSession.create({
          data: {
            token: jwtClient,
            userId: user.id,
          },
        });
        res.cookie('auth_token', jwtClient, {
          httpOnly: true,
        });
        res.send({
          success: true,
        });
      })
      .catch((err: unknown) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            res.status(400).send('username or email already in use');
          }
        }
      });
  }
}
