import { Request, Response, NextFunction } from 'express';

//export default (req: Request, res: Response, next: NextFunction):void=>next();

export default (req: Request, res: Response, next: NextFunction): void => {
  console.debug(req.method, req.originalUrl, req.body);
  next();
}
