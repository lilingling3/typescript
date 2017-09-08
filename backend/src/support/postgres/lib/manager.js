"use strict";
/**
 * Created by zhongzhengkai on 16/8/19.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//后面采用require('pg').native来加速查询速度
const pg = require("pg");
const async = require("async");
const sqlComposer = require("./sqlComposer");
const project_1 = require("../../../config/env/project");
const logger_1 = require("../../../core/logger");
//@see https://github.com/tgriesser/knex/issues/387,
//让 bigint numeric 都不以string返回,而是转为正确的格式
pg.types.setTypeParser(20, 'text', parseInt);
pg.types.setTypeParser(1700, 'text', parseFloat); //让numeric也从string,变成float
var sqlLogger = logger_1.default('sql');
var config = project_1.default.postgres;
//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool;
initPool(config);
/**
 * 初始化连接池对象
 * @param config
 */
function initPool(config) {
    console.log('-------initPool--------');
    console.log(config);
    console.log('------------------------');
    console.log();
    pool = new pg.Pool(config);
}
exports.initPool = initPool;
/**
 * 从连接池里获得一个连接对象
 * @param cb
 */
function acquirePoolClient(cb) {
    pool.connect(function (err, client, done) {
        if (err) {
            console.error('error fetching client from pool', err);
            cb(err, null);
        }
        else {
            cb(null, client, done);
        }
    });
}
exports.acquirePoolClient = acquirePoolClient;
/**
 * 使用预置好的配置初始化后得到的连接池来做查询操作
 * 适合服务器端的应用程序去查询pg server
 * @param sql {String} - 欲执行的sql语句
 * @param args {Array} - sql语句里占位符实际要替换的字符串参数列表
 * use case : query('select * from company where age > $1 and address = $2',[190,'BeiJing'], function(err, result){})
 * @param cb
 */
function query(sql, args, cb) {
    sqlLogger.info(sql, args);
    acquirePoolClient(function (err, client, done) {
        if (err) {
            cb(err, null);
        }
        else {
            client.query(sql, args, function (err, result) {
                done(); //归还client给连接池
                if (err) {
                    console.error('error running query', err);
                    sqlLogger.error(err);
                    cb(err, null);
                }
                else {
                    cb(null, result); //result.rows 是需要的数据
                }
            });
        }
    });
}
exports.query = query;
function wrapOperation(operation, sqls, results, opMap) {
    var cmd = Object.keys(operation)[0];
    var payload = operation[cmd];
    var tag = payload.tag;
    if (results) {
        if (results[tag])
            throw new Error('queryWithTransaction: tag duplicated:' + tag);
        results[tag] = tag;
    }
    opMap[tag] = payload;
    if (payload.preHandler) {
        sqls.push({ tag: payload.tag, operation: operation, cmd: cmd });
    }
    else {
        var item = generateSqlItem(operation, cmd);
        if (item)
            sqls.push(item);
    }
}
function generateSqlItem(operation, cmd) {
    var payload = operation[cmd];
    var returnFields = payload.returnFields || ['id'];
    var sc; // sqlComposer's result
    switch (cmd) {
        case '$insert':
            sc = sqlComposer.prepareInsertSql(payload.tableName, payload.toInsert, returnFields, true);
            break;
        case '$insertBatch':
            if (payload.toInserts.length == 0)
                throw new Error('queryWithTransaction: $insertBatch can not accept empty array!');
            sc = sqlComposer.prepareBatchInsertSql(payload.tableName, payload.toInserts, returnFields, true);
            break;
        case '$update':
            sc = sqlComposer.prepareUpdateSql(payload.tableName, payload.filter, payload.toUpdate, returnFields, true);
            break;
        case '$updateBatch':
            if (payload.toUpdates.length == 0)
                throw new Error('queryWithTransaction: $updateBatch can not accept empty array!');
            sc = sqlComposer.prepareBatchUpdateSql(payload.tableName, payload.toUpdates, payload.filterKey, returnFields);
            break;
        case '$select':
            sc = sqlComposer.prepareSelectSql(payload.tableName, payload.filter, payload.fields, true);
            break;
        case '$delete':
            sc = sqlComposer.prepareDeleteSql(payload.tableName, payload.filter, true);
            break;
        case '$rawSql':
            sc = { sql: payload.sql, args: payload.args || [] };
            break;
        default:
            throw new Error('queryWithTransaction: unsupported cmd:' + cmd);
    }
    return { sql: sc.sql, args: sc.args, tag: payload.tag, operation: operation, cmd: cmd };
}
/**
 * 执行事务性的一组操作
 * @param operations {Array}
 * 操作对象形如以下示例,tag用于记录返回的结果,:
 * {'$insert':{tableName:'company',toInsert:{...},tag:'insertCompany'}}
 * {'$insertBatch':{tableName:'company',toInserts:{...},tag:'insertCompany'}}
 * {'$update':{tableName:'company',filter:{...},toUpdate:{...},tag:'updateCompany'}}
 * {'$select':{tableName:'company',filter:{...},fields:[],tag:'selectCompany'}}
 * {'$delete':{tableName:'company',filter:{...},tag:'deleteCompany'}}
 * {'$rawSql':{sql:'select salary,id from company',args:[],tag:'getMySalary'}}
 * @param cb
 */
function queryWithTransaction(operations, cb) {
    acquirePoolClient(function (err, client, done) {
        if (err) {
            cb(err, null);
        }
        else {
            var results = {};
            var sqlItems = [];
            var opMap = {};
            try {
                operations.forEach(function (v) {
                    wrapOperation(v, sqlItems, results, opMap);
                });
            }
            catch (ex) {
                return cb(ex);
            }
            client.query('begin'); //开始事务
            async.mapSeries(sqlItems, function (item, callback) {
                sqlLogger.info(item.sql, item.args);
                var operation = item.operation;
                var cmd = item.cmd;
                var payload = operation[cmd];
                var preHandler = payload.preHandler;
                var _item = item;
                if (preHandler) {
                    try {
                        preHandler(payload, results, opMap);
                        _item = generateSqlItem(operation, cmd);
                    }
                    catch (ex) {
                        return callback(ex);
                    }
                }
                client.query(_item.sql, _item.args, function (err, result) {
                    sqlLogger.info(_item.sql, _item.args);
                    if (err) {
                        callback(err);
                    }
                    else {
                        results[_item.tag] = result;
                        callback(undefined, _item);
                    }
                });
            }, function (err, asyncResults) {
                done(); //归还连接对象给连接池
                // asyncResults.forEach(val=> {
                //   sqlLogger.info(val.sql, val.args);
                // });
                err;
                if (err) {
                    //@ts-ignore
                    sqlLogger.error(err);
                    client.query('rollback', function () {
                        cb(err, results, opMap);
                    }); //回滚事务
                }
                else {
                    client.query('commit', function () {
                        cb(null, results, opMap);
                    }); //提交事务
                }
            });
        }
    });
}
exports.queryWithTransaction = queryWithTransaction;
/**
 * @description 指定一个临时的配置去做查询,通常用于脚本测试
 * @deprecated 服务器端的调用用query,而非queryOnce,query自带了连接池机制
 * @param cfg {Object} 指定连接配置
 * @param sql {String}
 * @param args {Array}
 * @param cb
 */
function queryOnce(cfg, sql, args, cb) {
    var client = new pg.Client(cfg);
    client.connect(function (err) {
        if (err) {
            console.error('error connecting pg server', err);
            return cb(err, null);
        }
        client.query(sql, args, function (err, result) {
            if (err) {
                console.error('error running query', err);
                cb(err, null);
            }
            else {
                client.end(function (err) {
                    if (err)
                        console.error('error disconnect the client', err);
                });
                cb(null, result); //result.rows 是需要的数据
            }
        });
    });
}
exports.queryOnce = queryOnce;
/**
 * @description 查询数据
 * @param tableName {String}
 * @param filter {Object} - 参见update函数的filter说明
 * @param fields {Array|Function} - 类型为Array时:默认会空的话,表示选出改数据的所有字段,
 * 类型Function时:为该字段设定为回调函数,也表示返回改数据的所有字段,此时第四个参数cb可以不用传递
 * @param cb
 */
function select(tableName, filter, fields, cb) {
    var cbFunc = cb;
    if (typeof fields == 'function') {
        cbFunc = fields;
        fields = [];
    }
    var sc = sqlComposer.prepareSelectSql(tableName, filter, fields, true);
    query(sc.sql, sc.args, cbFunc);
}
exports.select = select;
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
 * @param toUpdate {Object}
 * @param returnFields {Array} 更新后要返回的字段值,空数组表示什么都不返回
 * @param cb
 */
function update(tableName, filter, toUpdate, returnFields, cb) {
    var sc = sqlComposer.prepareUpdateSql(tableName, filter, toUpdate, returnFields, true);
    query(sc.sql, sc.args, cb);
}
exports.update = update;
function updateBatch(tableName, toUpdates, filterKey, returnFields, cb) {
    var sc = sqlComposer.prepareBatchUpdateSql(tableName, toUpdates, filterKey, returnFields);
    query(sc.sql, sc.args, cb);
}
exports.updateBatch = updateBatch;
/**
 * @description 向一张表里插入一条数据
 * @param tableName {String} 表名
 * @param toInsert {Object} 普通的json对象
 * @param returnFields {Object} 更新后要返回的字段值,空数组表示什么都不返回
 * @param cb
 */
function insert(tableName, toInsert, returnFields, cb) {
    var sc = sqlComposer.prepareInsertSql(tableName, toInsert, returnFields, true);
    query(sc.sql, sc.args, cb);
}
exports.insert = insert;
/**
 * @description 向一张表里插入多条数据
 * @param tableName {String} 表名
 * @param toInserts {Array} 一个json数组,里面包含了欲插入的多个json对象
 * @param returnFields {Array} 更新后要返回的字段值,空数组表示什么都不返回
 * @param cb
 */
function insertBatch(tableName, toInserts, returnFields, cb) {
    try {
        var sc = sqlComposer.prepareBatchInsertSql(tableName, toInserts, returnFields, true);
        query(sc.sql, sc.args, cb);
    }
    catch (ex) {
        cb(ex.message);
    }
}
exports.insertBatch = insertBatch;
/**
 * @description 删除数据
 * @param tableName tableName {String}
 * @param filter {Object} - 参见update函数的filter说明
 * @param cb
 */
function remove(tableName, filter, cb) {
    var sc = sqlComposer.prepareDeleteSql(tableName, filter, true);
    query(sc.sql, sc.args, cb);
}
exports.remove = remove;
const jsonbSet = sqlComposer.jsonbSet;
exports.jsonbSet = jsonbSet;
