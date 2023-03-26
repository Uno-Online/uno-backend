import { StatusCode } from '../constants';
import HttpException from './http-exception';

/**
 * Exceção caso o usuário tenha enviado algo não esperado pelo request
 * Exemplo: quando a validação feita pelo zod falha
 * */
class BadRequestException extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export default BadRequestException;
