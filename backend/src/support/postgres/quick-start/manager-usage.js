/**
 * Created by zhongzhengkai on 16/8/19.
 */

var manager = require('../lib/manager');

//var pgCfg = {
//  user: 'financeuser',
//  database: 'finance',
//  password: 'boldseas2016@finance',
//  host:'localhost',
//  port: 5432
//};
//
//
//manager.queryOnce(pgCfg, 'select * from company where age > $1', [50] , function(err, result){
//  console.log(err, result.rows);
//});


//manager.query('select * from test', [] , function(err, result){
//  console.log(err, result.rows);
//});

manager.insert('test',{data:{name:'gogo'}},function(err, result){
  console.log(err, result.rows);
});
