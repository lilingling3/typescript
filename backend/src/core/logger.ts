import * as log4js from 'log4js';
import logConf from '../config/log4js';

log4js.configure(logConf);

const getLogger = (category: string) => {
  return log4js.getLogger(category);
}

console.log = function(message, ...other: string[]){
  if(other.length>1)getLogger('debug').info(message, other);
  else getLogger('debug').info(message);
};

export default getLogger;
