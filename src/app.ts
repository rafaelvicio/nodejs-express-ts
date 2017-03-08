import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as http from 'http';
import * as appconfig from './config/config'

// import errorHandler = require('errorhandler');
import * as errorHandler from 'errorhandler';
// import { IndexRoute } from './routes/index';
import UserRoute from './routes/User';
import { SequelizeStorageManager } from './StorageManager'

const app: express.Application = express();

const storageManager: SequelizeStorageManager = new SequelizeStorageManager(
  {
    database: appconfig.getConfig().database,
    username: appconfig.getConfig().username,
    password: appconfig.getConfig().password
  });

// storageManager.init(true);
storageManager.init(false);

config();
routes();

function config() {
  // add static paths
  app.use(express.static(path.join(__dirname, 'public')));

  // configure pug
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'pug');

  // mount logger
  app.use(logger('dev'));

  // mount json form parser
  app.use(bodyParser.json());

  // mount cookie parker
  app.use(cookieParser('SECRET_GOES_HERE'));

  // catch 404 and forward to error handler
  app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    err.status = 404;
    next(err);
  });

  // error handling
  app.use(errorHandler());
}

function routes() {
  const router: express.Router = express.Router();

  const userRoute: UserRoute = new UserRoute(storageManager);
  userRoute.configure(router);

  app.use(router);
}

export = app;
