import {Request, Response, NextFunction} from 'express';

export default (req: Request, res: Response, next: NextFunction):void=>{
  console.debug(req.method, req.originalUrl);
  console.log('log: ',req.method, req.originalUrl);
  next();
}
 