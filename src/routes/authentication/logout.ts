import { Request, Response } from 'express';
import { CookieKey } from '../../constants/cookie-key';
import { prisma } from '../../prisma';
import { JwtService } from '../../services';

export const logout = async (req: Request, res: Response) => {
  const { [CookieKey.AuthToken]: authToken } = req.cookies;

  try {
    const payload = JwtService.decrypt<{ userId: number }>(authToken);

    const userSession = await prisma.userSession.deleteMany({
      where: {
        userId: payload.userId,
      },
    });

    if (userSession.count >= 1) {
      res.clearCookie(CookieKey.AuthToken);
      res.json({ success: true });
    }

    res
      .status(400)
      .json({ success: false, message: 'No user found with this token' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Invalid JWT' });
  }
};
