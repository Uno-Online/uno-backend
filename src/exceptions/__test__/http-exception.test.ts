import { StatusCode } from '../../constants';
import HttpException from '../http-exception';

describe('Http exception class', () => {
  const statusCode = 0 as StatusCode;

  it('Class to be instanced', () => {
    const httpException = new HttpException('HTTP Exception', statusCode);

    expect(httpException).toBeDefined();
    expect(httpException).toBeInstanceOf(Error);
  });

  it('Check the message being a string', () => {
    const httpException = new HttpException('String message', statusCode);

    expect(JSON.parse(httpException.message)).toEqual({
      message: 'String message',
      status: 0,
    });
  });

  it('Check the message being an object', () => {
    const message = {
      message: 'Object message',
    };

    const httpException = new HttpException(message, statusCode);

    expect(JSON.parse(httpException.message)).toEqual(message);
  });

  it('Check if the status is correct', () => {
    const httpException = new HttpException('HTTP Exception', statusCode);

    expect(httpException.status).toBe(0);
  });
});
