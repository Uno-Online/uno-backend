import { StatusCode } from '../constants';
import HttpException from './http-exception';

class Unauthorized extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.UNAUTHORIZED);
  }
}

export default Unauthorized;
