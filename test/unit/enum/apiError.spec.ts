import ApiError from '../../../src/enum/ApiError';

describe('Test Api enum', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test message error', () => {
    const messageMock = 'bad request';
    const statusMock = 400;

    const apiError = new ApiError(messageMock, statusMock);

    expect(apiError.message).toBe(messageMock);
  });
});
