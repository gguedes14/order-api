import Env from '../../../src/utils/envVariables';

describe('Util Env Variables', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getVariablesFromJson', () => {
    const envVars = Env
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .getVariablesFromJson('local');

    expect(envVars).toHaveProperty('APP_ENV', 'local');
  });

  test('getVariableFromProcess', () => {
    // eslint-disable-next-line no-process-env
    process.env.TEST_VAR_ENV_SPEC = 'abc';

    const value = Env
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .getVariableFromProcess('TEST_VAR_ENV_SPEC');

    expect(value).toBe('abc');

    // eslint-disable-next-line no-process-env
    delete process.env.TEST_VAR_ENV_SPEC;
  });

  test('getNumber', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          TEST_VAR: '123',
        },
      );

    const value = Env.getNumber(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBe(123);
  });

  test('getNumber with float', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          TEST_VAR: '123.456',
        },
      );

    const value = Env.getNumber(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBe(123.456);
  });

  test('getNumber with undefined variable', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {},
      );

    const value = Env.getNumber(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBeNull();
  });

  test('getNumber with invalid number', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          TEST_VAR: 'abc',
        },
      );

    const value = Env.getNumber(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBeNull();
  });

  test('getString', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          TEST_VAR: 'abc',
        },
      );

    const value = Env.getString(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBe('abc');
  });

  test('getString with undefined variable', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {},
      );

    const value = Env.getString(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBeNull();
  });

  test('getBoolean', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {
          TEST_VAR: 'true',
        },
      );

    const value = Env.getBoolean(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBe(true);
  });

  test('getBoolean with undefined variable', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariablesFromJson',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {},
      );

    const value = Env.getBoolean(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'TEST_VAR',
    );
    expect(value).toBeNull();
  });

  test('getAppEnv', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariableFromProcess',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'local',
      );

    const value = Env.getAppEnv();
    expect(value).toBe('local');
  });

  test('getAppEnv with undefined variable', () => {
    jest
      .spyOn(
        Env,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'getVariableFromProcess',
      )
      .mockReturnValue(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        undefined,
      );

    jest.spyOn(console, 'error').mockReturnValue();

    const value = Env.getAppEnv();
    expect(value).toEqual('local');

    expect(
      // eslint-disable-next-line no-console
      console.error,
    ).toHaveBeenCalledWith('Environment variable APP_ENV was not set, defaulting to local');
  });

  test('getStringOrThrow successfully', () => {
    jest.spyOn(Env, 'getString').mockReturnValue('test');

    // @ts-expect-error test env variable
    const value = Env.getStringOrThrow('test_string');
    expect(value).toBe('test');

    expect(Env.getString).toHaveBeenCalledWith('test_string');
  });

  test('getStringOrThrow with undefined variable', () => {
    jest.spyOn(Env, 'getString').mockReturnValue(null);

    // @ts-expect-error test env variable
    expect(() => Env.getStringOrThrow('test_string')).toThrowError(
      'Environment variable test_string is not set',
    );
  });

  test('getBooleanOrThrow successfully', () => {
    jest.spyOn(Env, 'getBoolean').mockReturnValue(true);

    // @ts-expect-error test env variable
    const value = Env.getBooleanOrThrow('test_bool');
    expect(value).toBe(true);

    expect(Env.getBoolean).toHaveBeenCalledWith('test_bool');
  });

  test('getBooleanOrThrow with undefined variable', () => {
    jest.spyOn(Env, 'getBoolean').mockReturnValue(null);

    // @ts-expect-error test env variable
    expect(() => Env.getBooleanOrThrow('test_bool')).toThrowError(
      'Environment variable test_bool is not set',
    );
  });

  test('getNumberOrThrow successfully', () => {
    jest.spyOn(Env, 'getNumber').mockReturnValue(4);

    // @ts-expect-error test env variable
    const value = Env.getNumberOrThrow('test_number');
    expect(value).toBe(4);

    expect(Env.getNumber).toHaveBeenCalledWith('test_number');
  });

  test('getNumberOrThrow with undefined variable', () => {
    jest.spyOn(Env, 'getNumber').mockReturnValue(null);

    // @ts-expect-error test env variable
    expect(() => Env.getNumberOrThrow('test_number')).toThrowError(
      'Environment variable test_number is not set',
    );
  });

  test('getTokenJwt', () => {
    jest.spyOn(Env, 'getStringOrThrow').mockReturnValue('repo');
    expect(Env.getTokenJwt()).toBe('repo');
    expect(Env.getStringOrThrow).toHaveBeenCalledWith('JWT_TOKEN');
  });
});
