import jwt from 'jsonwebtoken';
import {CryptService} from './crypt-service'

export class JwtService {
  private static secret = process.env.JWT_SECRET!;
  private static encrypter = new CryptService();

  static secureEncrypt<T extends object>(value: T) {
    const secured = this.encrypter.encrypt(JSON.stringify(value)) 
    return jwt.sign(secured, this.secret);
  }

  static securedDecrypt<T extends object>(token:string) {
    const decrypted = jwt.verify(token, this.secret) as string;
    return JSON.parse(this.encrypter.decrypt(decrypted)) as T
  }

  static encrypt<T extends object>(value: T) {
    return jwt.sign(value, this.secret);
  }

  static decrypt<T extends object>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
