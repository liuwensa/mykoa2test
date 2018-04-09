'use strict';

const path = require('path');

const filePath = '/raid/uploadfiles';

module.exports = {
  projPort : 3533,
  session  : {
    secret: 'mykoa2test'
  },
  db       : {
    dbprefix: 'mongodb://',
    dbhost  : '127.0.0.1',
    port    : '27017',
    dbname  : 'trykoa2',
    username: '',
    password: ''
  },
  redis    : {
    host    : '127.0.0.1',
    port    : 6379,
    password: '',
    db      : 0
  },
  log      : {
    nolog         : /\.(js|css|png|jpeg|ico|gif|svg)$/,
    level         : 'AUTO',
    format        : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    logFileDir    : '/raid/logs/mykoa2',
    needConsole   : true,
    replaceConsole: true
  },
  filePath : filePath,
  tmpDir   : path.join(filePath, 'tmp'),
  uploadDir: path.join(filePath, 'images')
};
