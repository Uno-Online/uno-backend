import { StatusCode } from '../constants';
import HttpException from './http-exception';

/**
 * Erro caso o usuário não tenha permissão para executar determinada ação
 * */
class Forbidden extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.FORBIDDEN);
  }
}

export default Forbidden;
