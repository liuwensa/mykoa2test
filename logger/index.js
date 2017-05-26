'use strict';

const log4js = require('koa-log4');

const log4jsConfig = require('./log4jsConfig');

log4js.configure(log4jsConfig);

module.exports = log4js;
