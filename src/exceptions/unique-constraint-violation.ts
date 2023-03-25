import { StatusCode } from '../constants';
import HttpException from './http-exception';

class UniqueConstraintViolation extends HttpException {
  constructor(message: string | object) {
    super(message, StatusCode.BAD_REQUEST);
  }
}

export default UniqueConstraintViolation;
