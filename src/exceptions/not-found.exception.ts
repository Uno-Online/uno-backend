import HttpException, { StatusCode } from './http-exception';

class NotFound extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export default NotFound;
