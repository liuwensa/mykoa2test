'use strict';

require('./globals');

const Koa            = require('koa');
const views          = require('koa-views');
const json           = require('koa-json');
const onerror        = require('koa-onerror');
const bodyparser     = require('koa-bodyparser');
const session        = require('koa-generic-session');
const koaRedis       = require('koa-redis');
const convert        = require('koa-convert');
const methodOverride = require('koa-methodoverride');
// const CSRF           = require('koa-csrf');
const log4js         = require('koa-log4');

const index  = require('./routes/index');

const redisStore = koaRedis(config.redis);
// const redisStore = koaRedis({
//   url: `redis://${config.redis.host}:${config.redis.port}/${config.redis.db}`
// });

const app = new Koa();

app.keys = ['mykeys'];
app.use(convert(session({
  store : redisStore,
  prefix: '__sess:',
  key   : '__sid'
})));

// error handler
onerror(app);

app.use(log4js.koaLogger(logger, config.log));
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}));
app.use(methodOverride());
app.use(json());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {extension: 'ejs'}));

// // CSRF（Cross-site request forgery）跨站请求伪造
// app.use(new CSRF({
//   invalidSessionSecretMessage   : 'Invalid session secret',
//   invalidSessionSecretStatusCode: 403,
//   invalidTokenMessage           : 'Invalid CSRF token',
//   invalidTokenStatusCode        : 403,
//   excludedMethods               : ['GET', 'HEAD', 'OPTIONS'],
//   disableQuery                  : false
// }));

app.use(async (ctx, next) => {
  try {
    // 先去执行路由
    await next();
  } catch (error) {
    return next(error);
  }
});

// routes
app.use(index.routes(), index.allowedMethods());

app.listen(config.projPort, (err) => {
  if (err) {
    throw err;
  } else {
    logger.info(`server start on ${config.projPort}`);
  }
});
