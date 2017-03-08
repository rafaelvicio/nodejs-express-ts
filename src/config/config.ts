
export interface IConfig {
  username: string;
  password: string;
  database: string;
  host: string;
}

export const DEVELOPMENT_CONFIG: IConfig = {
  'username': 'postgres',
  'password': 'postgres',
  'database': 'node-express-ts-dev',
  'host': 'localhost'
}

export const TEST_CONFIG: IConfig = {
  'username': 'postgres',
  'password': 'postgres',
  'database': 'node-express-ts-test',
  'host': 'localhost'
}

export const PRODUCTION_CONFIG: IConfig = {
  'username': 'postgres',
  'password': 'postgres',
  'database': 'node-express-ts-prod',
  'host': 'localhost'
}

export function getConfig(): IConfig {
  switch (process.env.NODE_ENV) {
    case 'development':
      return DEVELOPMENT_CONFIG;

    case 'test':
      return TEST_CONFIG;

    case 'production':
      return PRODUCTION_CONFIG;

    default:
      throw 'Environment not identified: ' + process.env.NODE_ENV;

  }
}
