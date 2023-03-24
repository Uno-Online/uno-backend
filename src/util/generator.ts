import { UserSeedAndUrl } from '../types/user-seed-with-url';
import { SEED_SIZE, AVATAR_SVG_URL } from '../constants';

export const generateUserAvatar = (): UserSeedAndUrl => {
  const seed = Date.now() % SEED_SIZE;
  const url = new URL(`?seed=${String(seed)}`, AVATAR_SVG_URL);
  return {
    url,
    seed,
  };
};
