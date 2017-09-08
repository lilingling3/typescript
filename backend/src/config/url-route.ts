import {Router} from 'express';
import pageRouter from '../mvc/routes/page';
import apiRouter from '../mvc/routes/api';

interface conf{
  [prop: string]: {router: Router}
}

const confIns:conf = {
  '/':{router: pageRouter},
  '/api':{router: apiRouter},
}
export default confIns;