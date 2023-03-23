import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import { CookieKey } from '../../constants/cookie-key';
import { prisma } from '../../prisma';
import { JwtService } from '../../services';
import { loginValidationSchema } from './login.validation';

export const login = async (req: Request, res: Response) => {
  const parsed = loginValidationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.send('invalid request body');
    return;
  }
  const { data } = parsed;

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    res.status(400).send('invalid email or password');
    return;
  }

  if (await bcrypt.compare(data.password, user.passwordHash!)) {
    const token = JwtService.encrypt({ userId: user.id });

    res.cookie(CookieKey.AuthToken, token, {
      httpOnly: true,
    });
    res.send({
      success: true,
    });
  } else {
    res.status(400).send('invalid username or password');
  }
};
