/**
 * Created by fuweiwei on 2016/8/23.
 */

var pgManager = require('../lib/manager');

tQuery2();
function tQuery2() {
  var name = 'bus2';
  var operationArr = [
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData',preHandler:(operation,results)=>{
      console.log('!!!!!!!!!!!!!!!!!!!!!!');
      console.log(operation);
      console.log(results.newData.rows);
    }}},
    {'$update':{tableName:'company',filter:{name:name},toUpdate:{age:66},tag:'modData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData2'}},
    {'$delete':{tableName:'company',filter:{name:name},tag:'delData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData3'}}
  ];

  var operationArr = [
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData1'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData2',preHandler:(operation,results)=>{
      operation.toInsert.id = results.newData1.rows[0].id;
    }}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData3'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData4'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData5'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData6'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData7'}},
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData8'}}
  ];
  pgManager.queryWithTransaction(operationArr, (err, results)=> {
    console.log('queryWithTransaction done!',results);
  });
}
