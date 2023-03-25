import { Request, Response } from 'express';
import { AVATAR_SVG_URL, SEED_LENGTH } from '../../constants';

export const generateUserIconSvg = (req: Request, res: Response) => {
  const seed = Date.now() % SEED_LENGTH;
  const url = new URL('', AVATAR_SVG_URL);

  url.searchParams.set('seed', String(seed));

  res.json({ success: true, url, seed });
};
