import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma';
import { registerValidationSchema } from './register.validation';
import { SALT_ROUNDS } from '../../constants';
import { CookieKey } from '../../constants/cookie-key';
import { JwtService } from '../../services';
import { BadRequest } from '../../exceptions';

export const register = async (req: Request, res: Response) => {
  const genEmail = () =>
    new Promise<string>((resolve, reject) => {
      randomBytes(85, (err, data) => {
        if (err) reject();
        if (data) resolve(`${data.toString('hex')}@p.com`);
      });
    });
  try {
    const data = registerValidationSchema.parse(req.body);

    const isGuest = !(data.password && data.email);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email || (await genEmail()),
        avatarSeed: data.avatarSeed,
        passwordHash: isGuest
          ? undefined
          : await bcrypt.hash(data.password!, SALT_ROUNDS),
        isGuest,
      },
    });

    const token = JwtService.encrypt({ userId: user.id });

    await prisma.userSession.create({
      data: {
        token,
        userId: user.id,
      },
    });

    res.cookie(CookieKey.AuthToken, token, {
      httpOnly: true,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new BadRequest({
          msg: 'email already in use',
          data: err,
        });
      }
    }
    if (err instanceof Error) {
      throw new BadRequest(err);
    }
    throw new BadRequest('something went wrong');
  }
};
