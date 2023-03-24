import { Request, Response } from 'express';
import { generateUserAvatar } from '../../util/generator';

export const generateUserIconSvg = (req: Request, res: Response) => {
  const { url, seed } = generateUserAvatar();
  res.json({ success: true, url, seed });
};
