import * as Promise from 'bluebird';
import * as Sequelize from 'sequelize';
import * as uuid from 'node-uuid';
import { UserDAO } from './models/User'

export interface IStorageConfig {
  database: string;
  username: string;
  password: string
}

export class SequelizeStorageManager {
  public sequelize: Sequelize.Sequelize;
  public userDAO: UserDAO;

  // private logger: Logger;
  private config: IStorageConfig;

  // constructor(config: SequelizeStorageConfig, logger: Logger) {
  constructor(config: IStorageConfig) {
    this.config = config;
    // this.logger = logger.child({ component: "Storage" });

    this.sequelize = new Sequelize(
      this.config.database,
      this.config.username,
      this.config.password,
      { dialect: 'postgres' }
    );

    this.userDAO = new UserDAO(this.sequelize);
  }

  init(force?: boolean): Promise<any> {
    force = force || false;
    return this.sequelize.sync({ force: force, logging: console.log });
  }
}
