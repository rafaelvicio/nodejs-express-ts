import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { SequelizeStorageManager } from '../StorageManager'

export default class UserRoute {
  constructor(private storageManager: SequelizeStorageManager) {
  }

  public configure(router: express.Router) {

    // http://localhost:3000/api/user
    router.get('/api/user',
      (req: Request, res: Response, next: NextFunction) => {
        this.storageManager.userDAO.list()
          .then((users) => {
            res.send(users);
          })
          .catch((err: any) => {
            console.log(err);
            res.send({ message: 'Internal error: ' + JSON.stringify(err) });
          });
      });
  }
}
