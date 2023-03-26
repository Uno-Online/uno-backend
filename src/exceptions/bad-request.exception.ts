import HttpException, { StatusCode } from './http-exception';

class BadRequest extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export default BadRequest;
