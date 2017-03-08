// FIXME: DatabaseCleaner has no @types
const DatabaseCleaner = require('database-cleaner');

import * as pg from 'pg';
import { TEST_CONFIG } from '../config/config'

export function clearTables(done: (err?: any) => void) {
  const databaseCleaner = new DatabaseCleaner('postgresql');
  const connectionString = `postgres://${TEST_CONFIG.username}:${TEST_CONFIG.password}@${TEST_CONFIG.host}/${TEST_CONFIG.database}`;

  pg.connect(connectionString, function (err, client, release) {
    if (err) {
      return done(err);
    }
    databaseCleaner.clean(client, () => {
      release();
      done();
    });
  });
}
