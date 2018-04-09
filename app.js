'use strict';

require('./globals');

const path           = require('path');
const Koa            = require('koa');
const views          = require('koa-views');
const json           = require('koa-json');
const Onerror        = require('koa-onerror');
const bodyparser     = require('koa-bodyparser');
const session        = require('koa-session');
const methodOverride = require('koa-methodoverride');
const CSRF           = require('koa-csrf');
const log4js         = require('koa-log4');
const koaStatic      = require('koa-static');
const conditional    = require('koa-conditional-get');
const etag           = require('koa-etag');
const fs             = require('fs-extra');
const jwt            = require('koa-jwt');

/* eslint-disable */
fs.mkdirsSync(config.uploadDir);
fs.mkdirsSync(config.tmpDir);
/* eslint-enable */

const RedisStore   = require('./libs/store');
const index        = require('./routes/index');
const handleResult = require('./middlewares/handleResult');

const app = new Koa();

app.use(conditional());
app.use(etag());

app.keys = ['myproject'];

app.use(session({
  key      : 'myproject',
  maxAge   : 864000000,
  overwrite: true,
  httpOnly : true,
  signed   : true,
  store    : new RedisStore('myproject', config.redis)
}, app));

// error handler
Onerror(app);

app.use(log4js.koaLogger(logger, config.log));
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}));
app.use(methodOverride());
app.use(json());
app.use(koaStatic(path.join(__dirname, '/public'), {maxAge: 365 * 24 * 60 * 60}));

app.use(views(path.join(__dirname, '/views'), {extension: 'ejs'}));

// CSRF（Cross-site request forgery）跨站请求伪造
app.use(new CSRF({
  invalidSessionSecretMessage   : 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage           : 'Invalid CSRF token',
  invalidTokenStatusCode        : 403,
  excludedMethods               : ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
  disableQuery                  : false
}));

app.use(handleResult({}));

// app.use(jwt({secret: 'shared-secret'}).unless({ path: [/^\/public/] }));
app.use(jwt({secret: 'shared-secret'}).unless({path: ['/login']}));

// routes
app.use(index.routes(), index.allowedMethods());

// 404处理
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body   = {
    code: 404
  };
});

app.listen(config.projPort, (err) => {
  if (err) {
    throw err;
  } else {
    logger.info(`server start on ${config.projPort}`);
  }
});

module.exports = app;
