import CryptoJS from 'crypto-js';

export class CryptService {
  encrypt(text: string) {
    const parsed = CryptoJS.enc.Utf8.parse(text);
    const encrypted = CryptoJS.AES.encrypt(parsed, this.key, this.config).toString();
    return encrypted;
  }

  decrypt(text: string) {
    return CryptoJS.AES.decrypt(text, this.key, this.config).toString(CryptoJS.enc.Utf8);
  }

  // eslint-disable-next-line class-methods-use-this
  private get key() {
    return process.env.AES_SECRET!;
  }

  private get config() {
    return {
      iv: CryptoJS.enc.Utf8.parse(this.key),
      mode: CryptoJS.mode.CBC,
    };
  }
}

export default new CryptService();
