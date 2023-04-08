import { Request, Response, NextFunction } from 'express';
import i18next from 'i18next';

i18next.init({
  fallbackLng: 'en-US',
  resources: {
    'pt-BR': {
      translation: require('./../locales/pt-BR.json'),
    },
    'en-US': {
      translation: require('./../locales/en.json'),
    },
  },
});

export function internalize(req: Request, res: Response, next: NextFunction) {
  const { 'Accept-Language': lang = 'pt-BR' } = req.cookies;

  req.__internalize = i18next.getFixedT(lang);

  next();
}
