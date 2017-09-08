import test from 'ava';
import * as helper from '../support/postgres/helper';


interface ICampaign {
  id: number;
  year: number;
  name: string,
  seriesNO: string,
  type: number,
  hasSJV: boolean,
  hasBUX: boolean,
  budget: number,//预算
  startTime: number,//开始时间
  endTime: number,
  createTime: number,
  createUserId: number,
  CAMPAIGN_12M:
  {
    m1: number,
    m2: number,
    m3: number,
    m4: number,
    m5: number,
    m6: number,
    m7: number,
    m8: number,
    m9: number,
    m10: number,
    m11: number,
    m12: number
  },
  lastUpdateTime: number
}

const queryCampaign = ():Promise<ICampaign[]>=>helper.query('select * from "Campaign"', []);
const p = console.log;

const main = async()=>{
  let campaigns = await queryCampaign();
  p(campaigns[1].budget);
  console.log(campaigns[1].budget);
}

test('this is a simple test', async t=>{
  let campaigns = await queryCampaign();
  t.is(campaigns.length,2);
  let one = campaigns[0];
  t.is(one.budget,6666);
})

// main().then()