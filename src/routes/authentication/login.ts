import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import { CookieKey } from '../../constants/cookie-key';
import { BadRequest } from '../../exceptions';
import { prisma } from '../../prisma';
import { JwtService } from '../../services';
import { loginValidationSchema } from './login.validation';

export const login = async (req: Request, res: Response) => {
  const data = loginValidationSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new BadRequest('invalid email or password');
  }

  if (
    user?.passwordHash &&
    (await bcrypt.compare(data.password, user.passwordHash))
  ) {
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
    res.send({
      success: true,
    });
  } else {
    throw new BadRequest('invalid username or password');
  }
};
