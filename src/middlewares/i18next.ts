import { Request, Response, NextFunction } from 'express';
import i18next from 'i18next';
import ptBR from '../locales/pt-BR.json';
import enUS from '../locales/en.json';

i18next.init({
  fallbackLng: 'en-US',
  resources: {
    'pt-BR': {
      translation: ptBR,
    },
    'en-US': {
      translation: enUS,
    },
  },
});

export function internalize(req: Request, res: Response, next: NextFunction) {
  const { 'Accept-Language': lang = 'pt-BR' } = req.cookies;

  req.fnInternalize = i18next.getFixedT(lang);

  next();
}
