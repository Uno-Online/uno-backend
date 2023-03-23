import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma';
import { registerValidationSchema } from './register.validation';
import { SALT_ROUNDS } from '../../constants';
import { CookieKey } from '../../constants/cookie-key';
import { JwtService } from '../../services';

export const register = async (req: Request, res: Response) => {
  const body = registerValidationSchema.safeParse(req.body);

  if (!body.success) {
    res.status(400).send('Invalid register request body');
    return;
  }

  const { data } = body;

  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: data.password && await bcrypt.hash(data.password, SALT_ROUNDS),
        isGuest: !!(data.password&&data.email), // todo isso me parece pouco seguro
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
        res.status(400).send('username or email already in use');
      }
    }
  }
};
