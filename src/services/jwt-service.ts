import jwt from 'jsonwebtoken';

export class JwtService {
  private static secret = process.env.JWT_SECRET!;

  static encrypt<T extends object>(value: T) {
    return jwt.sign(value, this.secret);
  }

  static decrypt<T extends object>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
