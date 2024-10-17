import { Knex } from 'knex';
import * as envJson from '../../env.json';

const knexConfig: Knex.Config = {
  client: 'pg',
  debug: false,
  connection: {
    host: envJson.local.DB_HOST,
    port: envJson.local.DB_PORT,
    user: envJson.local.DB_USER,
    password: envJson.local.DB_PASSWORD,
    database: envJson.local.DB_NAME,
    charset: 'utf8mb4',
    dateStrings: true,
    timezone: 'utc',
    ssl:
      ['localhost', '127.0.0.1', '0.0.0.0'].includes(envJson.local.DB_HOST || '127.0.0.1') &&
      envJson.local.DB_PORT === 5432
        ? false
        : {
            rejectUnauthorized: false,
          },
  },
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    directory: '../migrations',
  },
  seeds: {
    directory: '../seeds',
  },
};

export default knexConfig;
