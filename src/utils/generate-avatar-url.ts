import { AVATAR_SVG_URL, SEED_LENGTH } from '../constants';

export const generateAvatarUrl = (seed?: number): [string, string] => {
  const url = new URL('', AVATAR_SVG_URL);

  url.searchParams.set('seed', String(seed ?? Date.now() % SEED_LENGTH));
  return [url.searchParams.get('seed')!, url.toString()];
};
