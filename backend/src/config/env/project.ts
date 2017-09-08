//declare var require: any
import defaultEnv from '../default-env';

let { APP_ENV = defaultEnv } = process.env;
// let projConf = import('./project-'+APP_ENV);
// let modulePath:string = './project-test';
let targetConf;
import projConfDev = require('./project-dev');
import projConfTest = require('./project-test');

const throwError = (message: string): never => { throw new Error(message) }

console.log('APP_ENV');
switch (APP_ENV) {
  case 'dev':
    targetConf = projConfDev.default;
    break;
  case 'test':
    targetConf = projConfTest.default;
    break;
  default:
    throwError('can not find project conf file for APP_ENV:' + APP_ENV);
}



type tCommonConfig = {
  SESSION_TIME_OUT: number;
  LDAP_URL: string;
  LOG_DIR?: string;
  postgres?:any
};

var commonConfig: tCommonConfig = {
  SESSION_TIME_OUT: 86400000,
  LDAP_URL: 'ldap://192.168.2.242:389'
};

for (var key in targetConf) {
  commonConfig[key] = targetConf[key];
}

export default commonConfig;