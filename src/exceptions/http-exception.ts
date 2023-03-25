import { StatusCode } from '../constants';

class HttpException extends Error {
  private exceptionCode: StatusCode;

  constructor(message: string | object, status: StatusCode) {
    super(
      JSON.stringify(
        typeof message === 'object'
          ? message
          : {
              status,
              message,
            }
      )
    );

    this.exceptionCode = status;
  }

  get status(): number {
    return this.exceptionCode;
  }
}

export default HttpException;
