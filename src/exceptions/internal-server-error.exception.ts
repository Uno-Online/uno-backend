import { StatusCode } from '../constants';
import HttpException from './http-exception';

class InternalServerError extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

export default InternalServerError;
