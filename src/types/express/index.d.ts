import ptBR from '../../locales/pt-BR.json';

export {};

declare module '*.json' {
  const value: any;
  export default value;
}

type TranslationKey = keyof typeof ptBR;

declare global {
  namespace Express {
    interface Request {
      user?: User;
      fnInternalize: (msg: TranslationKey) => string;
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
