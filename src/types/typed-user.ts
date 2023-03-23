export interface UserBase<Guest extends boolean> {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  isGuest: Guest;
  email: Guest extends true ? null : string;
  password: Guest extends true ? null : string;
}

export function createUser<Guest extends boolean>(user: UserBase<Guest>) {
  return user;
}
