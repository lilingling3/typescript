
import * as helper from '../../support/postgres/helper';
import { db } from '../base/types';

const tableName = 'Campaign';
export const getAll = (fields:string[] = [])=>{
  return helper.select<db.ICampaign>(tableName,{},fields);
}






