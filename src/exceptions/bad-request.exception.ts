import { StatusCode } from '../constants';
import HttpException from './http-exception';

class BadRequest extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export default BadRequest;
