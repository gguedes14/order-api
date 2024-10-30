import * as envJson from '../../env.json';

type EnvKeys = keyof (typeof envJson)[keyof typeof envJson];

type EnvJson = Record<string, Record<EnvKeys, string | number | boolean | undefined | null>>;

export type AppEnv = 'local';

export default class Env {
  private static getVariablesFromJson(env: AppEnv): {
    [key: string]: string | number | boolean | undefined | null;
  } {
    return (envJson as EnvJson)[env];
  }

  private static getVariableFromProcess(key: EnvKeys): string | undefined {
    // eslint-disable-next-line no-process-env
    return process.env[key];
  }

  static getNumber(key: EnvKeys): number | null {
    const envVars = this.getVariablesFromJson(Env.getAppEnv());

    const value = this.getVariableFromProcess(key) || envVars[key];

    if (value === undefined || value === null || typeof value === 'boolean') {
      return null;
    }

    const parsed = parseFloat(`${value}`);

    if (isNaN(parsed)) {
      return null;
    }

    return parsed;
  }

  static getString(key: EnvKeys): string | null {
    const envVars = this.getVariablesFromJson(Env.getAppEnv());

    const value = this.getVariableFromProcess(key) || envVars[key];

    if (value === undefined || value === null || typeof value === 'boolean') {
      return null;
    }

    return `${value}`;
  }

  static getBoolean(key: EnvKeys): boolean | null {
    const envVars = this.getVariablesFromJson(Env.getAppEnv());

    const value = this.getVariableFromProcess(key) || envVars[key];

    if (value === undefined || `${value}`.trim() === '') {
      return null;
    }

    return `${value}`.trim().match(/^(true|1|yes|on)$/i) !== null;
  }

  static getAppEnv(): AppEnv {
    let env: AppEnv = 'local';

    const appEnvs = ['local'];

    const appEnv = this.getVariableFromProcess('APP_ENV');

    if (appEnv && appEnvs.includes(appEnv)) {
      env = appEnv as AppEnv;
    } else {
      // eslint-disable-next-line no-console
      console.error('Environment variable APP_ENV was not set, defaulting to local');

      // eslint-disable-next-line no-process-env
      process.env.APP_ENV = 'local';
    }

    return env;
  }

  static getStringOrThrow(key: EnvKeys): string {
    const value = Env.getString(key);

    if (value === null) {
      throw new Error(`Environment variable ${key} is not set`);
    }

    return value;
  }

  static getBooleanOrThrow(key: EnvKeys): boolean {
    const value = Env.getBoolean(key);

    if (value === null) {
      throw new Error(`Environment variable ${key} is not set`);
    }

    return value;
  }

  static getNumberOrThrow(key: EnvKeys): number {
    const value = Env.getNumber(key);

    if (value === null) {
      throw new Error(`Environment variable ${key} is not set`);
    }

    return value;
  }

  static getTokenJwt(): string {
    return Env.getStringOrThrow('JWT_TOKEN');
  }

  static getDbHost(): string {
    return Env.getStringOrThrow('DB_HOST');
  }

  static getDbPort(): number {
    return Env.getNumberOrThrow('DB_PORT');
  }

  static getDbUsername(): string {
    return Env.getStringOrThrow('DB_USER');
  }

  static getDbPassword(): string {
    return Env.getStringOrThrow('DB_PASSWORD');
  }

  static getRileyEndpoint(): string {
    return Env.getStringOrThrow('RILEY_ENDPOINT');
  }
}
