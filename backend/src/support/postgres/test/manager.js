/**
 * Created by zhongzhengkai on 16/8/22.
 */

var pgManager = require('../lib/manager');
var sqlComposer = require('../lib/sqlComposer');
var assert = require('assert');

describe('test transaction',()=>{
  it('see transaction 1:',()=>{
    try{
      tQuery2();
    }catch(ex){
      console.log(ex);
    }
  });
});


//describe('test insert select update remove',()=>{
//  it('a whole case to show how curd:',()=>{
//    curd();
//  });
//});

function curd() {
  var name = 'wantNode';
  var toInsert = {name: name, age: 11, address: 'sg222', salary: 199};
  pgManager.insert('company', toInsert, function (err, result) {
    assert.equal(result.rowCount, 1);

    pgManager.select('company', {name: name, age: {'$gte': 11}}, [], function (err, result) {
      assert.equal(result.rows.length, 1);
      var dbData = result.rows[0];
      assert.deepEqual(dbData, toInsert);

      toInsert.address = 'new-address';
      pgManager.update('company', {id: dbData.id}, toInsert, function (err, result) {
        assert.equal(result.rowCount, 1);

        pgManager.select('company', {id: dbData.id}, [], function (err, result) {
          assert.equal(result.rows.length, 1);
          var dbData = result.rows[0];
          assert.deepEqual(dbData, toInsert);

          pgManager.remove('company', {id: {'$eq': dbData.id}},function(err, result){
            assert.equal(result.rowCount, 1);

            //{id: {'$eq': dbData.id}} 等同于 {id: dbData.id}
            pgManager.select('company', {id: dbData.id}, [], function (err, result) {
              assert.equal(result.rowCount, 0);
            });
          })
        })
      });
    });
  });
}

function tQuery2() {
  var name = 'bus2';//gogo2222222222
  var operationArr = [
    {'$insert':{tableName:'company',toInsert:{name:name,age:22,address:'bjbj',salary:500},tag:'newData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData',preHandler:(operation,results)=>{
      console.log('!!!!!!!!!!!!!!!!!!!!!!');
      console.log(operation,results.newData.rows);
    }}},
    {'$update':{tableName:'company',filter:{name:name},toUpdate:{age:66},tag:'modData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData2'}},
    {'$delete':{tableName:'company',filter:{name:name},tag:'delData'}},
    {'$select':{tableName:'company',filter:{name:name},fields:[],tag:'seeData3'}}
  ];
  console.log('preHandler3');
  pgManager.queryWithTransaction(operationArr, (err, results)=> {
    console.log('preHandler2');
    var newDataResult = results.newData;
    assert.equal(newDataResult.rowCount,1);

    var seeDataResult = results.seeData;
    assert.equal(seeDataResult.rows.length,1);
    assert.deepEqual(seeDataResult.rows[0],{name:name,age:22,address:'bjbj',salary:500});

    var modDataResult = results.modData;
    assert.equal(modDataResult.rowCount,1);

    var seeDataResult2 = results.seeData2;
    assert.equal(seeDataResult2.rows.length,1);
    assert.deepEqual(seeDataResult2.rows[0],{name:name,age:66,address:'bjbj',salary:500});

    var delDataResult = results.delData;
    assert.equal(delDataResult.rows.length,1);

    var seeDataResult3 = results.seeData3;
    assert.equal(seeDataResult3.rows.length,0);
  });
}





