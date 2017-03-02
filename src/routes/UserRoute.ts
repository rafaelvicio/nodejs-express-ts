import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';

export default class UserRoute {
  public list(req: Request, res: Response, next: NextFunction) {
    res.send(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'foo']);
  }
}
