"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const helper = require("../support/postgres/helper");
const queryCampaign = () => helper.query('select * from "Campaign"', []);
const p = console.log;
const main = async () => {
    let campaigns = await queryCampaign();
    p(campaigns[1].budget);
    console.log(campaigns[1].budget);
};
ava_1.default('this is a simple test', async (t) => {
    let campaigns = await queryCampaign();
    t.is(campaigns.length, 2);
    let one = campaigns[0];
    t.is(one.budget, 6666);
});
// main().then() 
