'use strict';

const fs       = require('fs');
const mongoose = require('mongoose');
const path     = require('path');

const dbConf = config.db;

const dbs = {};

const connectionURL = `${dbConf.dbprefix}${dbConf.dbhost}/${dbConf.dbname}`;

// 数据库连接
// mongoose.connect(`mongodb://${dbConf.username}:${dbConf.password}@${dbConf.dbhost}:${dbConf.port}/${dbConf.dbname}`);
mongoose.connect(connectionURL, function (err) {
  if (err) {
    console.log('connect to %s error', connectionURL, err.message);
  }
});

mongoose.set('debug', (collectionName, methodName, arg1, arg2, arg3) => {
  logger.info('[Mongoose] :', collectionName, methodName, arg1, arg2, arg3);
});

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== -1) && (file !== 'index.js') && (file !== 'db');
  })
  .forEach(function (file) {
    const modelName = file.replace('.js', '');
    dbs[modelName]  = require(path.join(__dirname, file));
  });

module.exports = dbs;
