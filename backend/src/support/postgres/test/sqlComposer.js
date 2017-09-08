/**
 * Created by zhongzhengkai on 16/8/19.
 */

'use strict';
var assert = require("assert");
var composer = require('../lib/sqlComposer');


describe('test sqlComposer:',  () => {

  it('if prepareSelectSql works well', () => {
    var result1 = composer.prepareSelectSql('company', {
      name: 'zzk',
      address: 'beijing',
      age: {'$ne': 'gogo'}
    }, ['name', 'age']);
    assert.equal(result1.sql, "select name,age from company where name='zzk' and address='beijing' and age!='gogo'");
    assert.deepEqual(result1.args, []);
  });

  it('if prepareSelectSql with args works well', () =>  {
    var result2 = composer.prepareSelectSql('company', {
      name: 'zzk',
      address: 'beijing',
      age: {'$ne': 'gogo'}
    }, ['name', 'age'], true);
    assert.equal(result2.sql, "select name,age from company where name=$1 and address=$2 and age!=$3");
    assert.deepEqual(result2.args, ['zzk', 'beijing', 'gogo']);
  });

  it('if prepareInsertSql works well', () => {
    var result3 = composer.prepareInsertSql('company', {name: 'zzk', address: 'beijing', age: 22}, []);
    assert.equal(result3.sql, "insert into company(name,address,age) values($1,$2,22)");
    assert.deepEqual(result3.args, ['zzk', 'beijing']);
  });

  it('if prepareBatchInsertSql works well', () => {
    var result4 = composer.prepareBatchInsertSql('company', [
      {name: 'zzk', address: 'beijing', age: 22},
      {name: 'zzk2', address: 'beijing2', age: 222}], []);
    assert.equal(result4.sql, "insert into company(name,address,age) values($1,$2,22),($3,$4,222)");
    assert.deepEqual(result4.args, ['zzk', 'beijing', 'zzk2', 'beijing2']);
  });

  it('if prepareUpdateSql works well', () => {
    var result5 = composer.prepareUpdateSql('company', {id: {'$gte': 'gg'}}, {name: 'zzk', age: 33}, true);
    assert.equal(result5.sql, "update company set name=$1,age=33 where id>=$2");
    assert.deepEqual(result5.args, ['zzk', 'gg']);

  });

  it('if prepareDeleteSql works well', () => {
    var result6 = composer.prepareDeleteSql('company', {id: {'$gte': 'gg'}}, true);
    assert.equal(result6.sql, "delete from company where id>=$1");
    assert.deepEqual(result6.args, ['gg']);
  });

});














