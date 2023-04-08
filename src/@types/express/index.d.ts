export {};

declare global {
  namespace Express {
    interface Request {
      user?: User;
      __internalize: (msg: string) => string;
    }

    interface User {
      id: number;
      username: string;
      email: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  }
}
