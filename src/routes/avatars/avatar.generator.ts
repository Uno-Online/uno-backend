import { Request, Response } from 'express';
import { generateAvatarUrl } from '../../utils';

export const generateUserIconSvg = (req: Request, res: Response) => {
  const [seed, url] = generateAvatarUrl();
  res.json({ success: true, url, seed });
};
