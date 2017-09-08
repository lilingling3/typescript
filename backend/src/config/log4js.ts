import projConf from './env/project';

let logDir = projConf.LOG_DIR || '/var/log/ut';
let logDirPath = logDir + '/';

var cfg = {
	appenders: [
		{ type: 'console' }, //控制台输出
		{
			type: 'file',
			filename: logDirPath+'debug.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'debug'
		},
		{
			type: 'file',
			filename: logDirPath+'exception.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'exception'
		},
		{
			type: 'file',
			filename: logDirPath+'startUp.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'startUp'
		},
		{
			type: 'file',
			filename: logDirPath+'error.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'error'
		},
		{
			type: 'file',
			filename: logDirPath+'zookeeper.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'zookeeper'
		},
		{
			type: 'file',
			filename: logDirPath + 'sql.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 5,
			category: 'sql'
		},
		{
			type: 'dateFile', //按日期划分的文件输出
			filename:  logDirPath+'httpAccess.log',
			maxLogSize: 1024 * 1024 * 1024,
			backups: 3,
			category: 'httpAccess',
			pattern: "-yyyy-MM-dd",
			alwaysIncludePattern: true,
			absolute: true
		}
	],

	//log4js的输出级别6个: trace, debug, info, warn, error, fatal
	//如果想为某个类型的log设置打印级别,解开下面的注释并修改,表示低于某个级别的日志不会输出
	//levels: { 'http-access': "INFO", 'error': "INFO"},

	replaceConsole: true//让所有console.log() 输出到log4js日志中，以[INFO] console代替console默认样式
};

export default cfg;