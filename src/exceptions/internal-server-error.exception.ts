import HttpException, { StatusCode } from './http-exception';

class InternalServerError extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

export default InternalServerError;
