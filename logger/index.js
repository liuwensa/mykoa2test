'use strict';

const log4js = require('koa-log4');

const log4jsConfig = require('./log4jsConfig');

log4js.configure(log4jsConfig);

const loggermain = log4js.getLogger('main');

loggermain.level  = 'auto';
loggermain.log4js = log4js;

module.exports = loggermain;
