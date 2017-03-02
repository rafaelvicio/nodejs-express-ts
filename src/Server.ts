import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
// import errorHandler = require('errorhandler');
import * as errorHandler from 'errorhandler';
// import { IndexRoute } from './routes/index';
import UserRoute from './routes/UserRoute';

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  private config() {
    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public')));

    // configure pug
    // this.app.set('views', path.join(__dirname, 'views'));
    // this.app.set('view engine', 'pug');

    // mount logger
    this.app.use(logger('dev'));

    // mount json form parser
    this.app.use(bodyParser.json());

    // mount cookie parker
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  private routes() {
    const router: express.Router = express.Router();

    const userRoute: UserRoute = new UserRoute();

    // http://localhost:3000/api/user
    router.get('/api/user', userRoute.list);

    this.app.use(router);
  }
}
