import { Request, Response } from 'express';

interface iResult {
  type: 'json' | 'file' | 'view' | 'redirect';
  // jsonData?: any;
  // fileName?: string;
  // view?: string;
  // redirectPath?: string;
}

interface iResultJson extends iResult {
  jsonData: any;
}

interface iResultFile extends iResult {
  fileName: string;
}

interface iResultView extends iResult {
  view: string;
  jsonData: any;
}

interface iResultRedirect extends iResult {
  redirectPath: string;
}

export const json = (jsonData: any): iResultJson => ({ type: 'json', jsonData });
export const file = (fileName: string): iResultFile => ({ type: 'file', fileName });
export const view = (view: string, jsonData: any): iResultView => ({ type: 'view', view, jsonData });
export const redirect = (redirectPath: string): iResultRedirect => ({ type: 'redirect', redirectPath });

/**
 * 使用指定的函数处理请求
 * @param fn 
 */
export const use = (fn) => {
  return (req: Request, res: Response, next) => {
    execute(fn, req, res);
  }
};
/**
 * 使用指定的模块作为请求处理器，模块需要预先实现好GET,POST,PUT,DELETE等方法（实现自己需要的就可以了）
 * 改方法会自动根据http请求的方法类型去匹配模块里对应的函数来作为请求处理器
 * @param moduleFn 
 */
export const useModule = (moduleFn) => {
  return (req: Request, res: Response, next) => {
    let { method, originalUrl } = req;
    let fn = moduleFn[method];
    if (fn) {
      execute(fn, req, res);
    } else {
      res.send(`no handler defined for ${method} ${originalUrl}`);
    }
  }
};

const execute = (fn, req: Request, res: Response) => {
  let { body, query, method } = req;
  fn(req, body, query).then((result: iResult) => {
    let type = result.type;
    switch (type) {
      case 'json':
        let resultJson: iResultJson = <iResultJson>result;
        return res.send(resultJson.jsonData);
    }

  }).catch(err => {
    res.send(err);
  });
};
