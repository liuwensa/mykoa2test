'use strict';

const path   = require('path');
const fs     = require('fs-extra');

const logConf = config.log;

// eslint-disable-next-line
fs.mkdirpSync(path.join(logConf.logFileDir, 'main'));

const appenders = [
  {
    category            : 'main',
    type                : 'dateFile',
    filename            : path.join(logConf.logFileDir, 'main/log-'),
    pattern             : 'yyyyMMdd',
    alwaysIncludePattern: true,
    maxLogSize          : 1024 * 1024 * 30
  },
  {
    category: 'main',
    type    : 'logLevelFilter',
    level   : 'WARN',
    appender: {
      type      : 'file',
      filename  : path.join(logConf.logFileDir, 'log.WARN'),
      maxLogSize: 1024 * 1024 * 30
    }
  },
  {
    category: 'main',
    type    : 'logLevelFilter',
    level   : 'ERROR',
    appender: {
      type      : 'file',
      filename  : path.join(logConf.logFileDir, 'log.ERROR'),
      maxLogSize: 1024 * 1024 * 30
    }
  }
];

if (config.log.needConsole) {
  appenders.push({
    type: 'console'
  });
}

module.exports = {
  appenders     : appenders,
  replaceConsole: config.log.replaceConsole
};
