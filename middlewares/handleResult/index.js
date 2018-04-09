/**
 * Created by admin on 2017/5/31.
 */

'use strict';

const lodash = require('lodash');

// const resError     = require('./resError');
const getErrorInfo = require('./getErrorInfo');

async function responseFormatter(ctx) {
  if (ctx.apiResults) {
    ctx.body = {
      code   : 0,
      desc   : 'success',
      message: ctx.apiResults || {}
    };
  } else if (ctx.renderView) {
    return await ctx.render('index', ctx.renderView);
  }
}

function urlFilter(options = {}) {
  return async function (ctx, next) {
    try {
      // 先去执行路由
      await next();
      await responseFormatter(ctx);
    } catch (error) {
      // const errorResult = new resError(error);
      // const errorInfo   = errorResult.errorInfo;
      const url  = ctx.request.url;

      if (error instanceof Error || lodash.isError(error)) {
        logger.error('\nError begin', '\n', error, '\n', url, '\n', 'Error end');
      } else {
        logger.warn('\nWarn begin', '\n', error, '\n', url, '\n', 'Warn end');
      }

      const errorInfo = getErrorInfo(error);

      ctx.status = errorInfo.statusCode || 500;
      ctx.body   = {
        code   : errorInfo.code,
        desc   : errorInfo.desc,
        message: errorInfo.message || {}
      };
    }
  };
}

module.exports = urlFilter;
