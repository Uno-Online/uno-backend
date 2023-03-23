import BadRequestException from '../bad-request-exception';
import HttpException from '../http-exception';

describe('Bad Request Exception class', () => {
  it('Class to be instanced', () => {
    const badRequestException = new BadRequestException(
      'Bad Request Exception'
    );

    expect(badRequestException).toBeDefined();
    expect(badRequestException).toBeInstanceOf(HttpException);
  });

  it('Check status code', () => {
    const badRequestException = new BadRequestException(
      'Bad Request Exception'
    );

    expect(badRequestException.status).toBe(400);
  });
});
