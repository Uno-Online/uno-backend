import HttpException, { StatusCode } from './http-exception';

class Unauthorized extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export default Unauthorized;
