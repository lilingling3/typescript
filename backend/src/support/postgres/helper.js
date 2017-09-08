"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhongzhengkai on 16/8/19.
 */
const pgManager = require("./lib/manager");
exports.default = pgManager;
exports.acquirePoolClient = pgManager.acquirePoolClient;
exports.jsonbSet = pgManager.jsonbSet;
exports.initPool = pgManager.initPool;
const handler = (resolve, reject) => (err, result) => { err ? reject(err) : resolve(result.rows); };
/**
 * @param sql {String} - 欲执行的sql语句
 * @param args {Array} - sql语句里占位符实际要替换的字符串参数列表
 */
exports.query = function (sql, args) {
    return new Promise((resolve, reject) => {
        pgManager.query(sql, args, handler(resolve, reject));
    });
};
/**
 * @description 指定一个临时的配置去做查询,通常用于脚本测试
 * @deprecated 服务器端的调用用query,而非queryOnce,query自带了连接池机制
 * @param cfg {Object} 指定连接配置
 * @param sql {String}
 * @param args {Array}
 */
exports.queryOnce = function (cfg, sql, args) {
    return new Promise((resolve, reject) => {
        pgManager.queryOnce(cfg, sql, args, handler(resolve, reject));
    });
};
/**
 * @description 带事务的一组sql命令操作
 * @param operations {Array} -命令数组,里面包含要按顺序执行的操作对象
 * 操作对象形如以下示例,tag用于记录返回的结果,:
 * {'$insert':{tableName:'company',toInsert:{...},tag:'insertCompany'}}
 * {'$insertBatch':{tableName:'company',toInserts:{...},tag:'insertCompany'}}
 * {'$update':{tableName:'company',filter:{...},toUpdate:{...},tag:'updateCompany'}}
 * {'$select':{tableName:'company',filter:{...},fields:[],tag:'selectCompany'}}
 * {'$delete':{tableName:'company',filter:{...},tag:'deleteCompany'}}
 * {'$rawSql':{sql:'select salary,id from company',args:[],tag:'getMySalary'}}
 *
 * perHandler(selfOp, results, opMap)
 */
exports.queryWithTransaction = function (operations) {
    return new Promise((resolve, reject) => {
        pgManager.queryWithTransaction(operations, handler(resolve, reject));
    });
};
/**
 * @description 向一张表里插入一条数据
 * @param tableName {String} 表名
 * @param toInsert {Object} 普通的json对象
 * @param returnFields {Array} 更新后要返回的字段值,空数组表示什么都不返回
 */
exports.insert = function (tableName, toInsert, returnFields) {
    return new Promise((resolve, reject) => {
        pgManager.insert(tableName, toInsert, returnFields, handler(resolve, reject));
    });
};
/**
 * @description 向一张表里插入多条数据
 * @param tableName {String} 表名
 * @param toInserts {Array} 一个json数组,里面包含了欲插入的多个json对象
 * @param returnFields {Array} 更新后要返回的字段值,空数组表示什么都不返回
 */
exports.insertBatch = function (tableName, toInserts, returnFields) {
    return new Promise((resolve, reject) => {
        pgManager.insertBatch(tableName, toInserts, returnFields, handler(resolve, reject));
    });
};
/**
 * @description 跟新一张表的数据
 * @param tableName {String}
 * @param filter {Object} - 过滤器,满足这些过滤器条件的行将会被更新
 *
 *  filter 设计参考了mongodb的filter设计,如下面的filter对应生成的sql:
 *  {name:'zzk',age:{'$gte':20}} --> where name = 'zzk' and age >= 20
 *  {age:{'$ne':20}} --> where age != 20
 *  {} -->  where age in(20,30,40)
 *  $操作符目前实现的有如下部分
 *  {'$gte': '>=', '$gt': '>', '$eq': '=', '$lte': '<=', '$lt': '<', '$ne': '!=', '$in':'in'}
 *
 * @param returnFields {Array} 更新后要返回的字段值,空数组表示什么都不返回
 * @param toUpdate {Object}
 */
exports.update = function (tableName, filter, toUpdate, returnFields) {
    return new Promise((resolve, reject) => {
        pgManager.update(tableName, filter, toUpdate, returnFields, handler(resolve, reject));
    });
};
exports.updateBatch = function (tableName, toUpdates, filterKey, returnFields) {
    return new Promise((resolve, reject) => {
        pgManager.updateBatch(tableName, toUpdates, filterKey, returnFields, handler(resolve, reject));
    });
};
/**
 * @description 查询数据
 * @param tableName {String}
 * @param filter {Object} - 参见update函数的filter说明
 * @param fields {Array|Function} - 类型为Array时:默认会空的话,表示选出改数据的所有字段,
 * 类型Function时:为该字段设定为回调函数,也表示返回改数据的所有字段,此时第四个参数cb可以不用传递
 */
exports.select = function (tableName, filter, fields) {
    return new Promise((resolve, reject) => {
        pgManager.select(tableName, filter, fields, handler(resolve, reject));
    });
};
exports.remove = function (tableName, filter) {
    return new Promise((resolve, reject) => {
        pgManager.remove(tableName, filter, handler(resolve, reject));
    });
};
