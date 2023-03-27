import { StatusCode } from '../constants';
import HttpException from './http-exception';

class NotFound extends HttpException {
  constructor(message: string) {
    super(message, StatusCode.NOT_FOUND);
  }
}

export default NotFound;
