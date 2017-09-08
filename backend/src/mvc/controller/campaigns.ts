import { webapi, db } from '../base/types';
import { json } from '../../core/gateway';
import { getAll } from '../model/campaign';

export const GET = async (req, body, query: webapi.query.get_campaigns) => {
  let length = query.length;
  let result = await getAll();
  let subResult = result.slice(0, length);
  let toReturn: webapi.response.get_campaigns[] = [];
  subResult.forEach(val => {
    toReturn.push({ ...val, extra_field1: 1, extra_field2: new Date().toDateString() });
  });
  return json(toReturn);
}

