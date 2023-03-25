import { StatusCode } from '../constants';
import HttpException from './http-exception';

/**
 * Erro caso o usuário não tenha permissão para executar determinada ação
 * */
class ForbiddenException extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export default ForbiddenException;
