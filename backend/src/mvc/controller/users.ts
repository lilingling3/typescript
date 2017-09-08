import { webapi, db } from '../base/types';
import { json } from '../../core/gateway';

export const GET =  async (req, body: webapi.body.get_user, query: webapi.query.get_user) => {
  console.log('=========================', JSON.stringify(body), '------------');
  return json([{ name: 1, age: 2 }, { name: 22, age: 33 }]);
}

