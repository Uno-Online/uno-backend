import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
import { JWTAdapter } from '../adapters/jwt-adapter';
import { SALT_ROUNDS } from '../constants';
import { registerUserValidationSchema } from '../validation-schemas/authentication.schema';

export class AuthenticationController {
  private jwt = new JWTAdapter(process.env.JWT_SECRET);

  async register(req: Request, res: Response) {
    const body = registerUserValidationSchema.safeParse(req.body);

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
