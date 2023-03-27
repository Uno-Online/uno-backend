import { StatusCode } from '../constants';

class HttpException extends Error {
  private exceptionCode: StatusCode;

  constructor(message: string, status: StatusCode) {
    super(message);

    this.exceptionCode = status;
  }

  get status(): number {
    return this.exceptionCode;
  }
}

export default HttpException;
