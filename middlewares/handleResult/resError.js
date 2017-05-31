/**
 * Created by liu10 on 2017/5/29.
 */

'use strict';

const getErrorInfo = require('./getErrorInfo');

/**
 * 自定义Api异常
 */
class resError extends Error {
  // 构造方法
  constructor(errorName) {
    super();

    this.errorInfo = getErrorInfo(errorName);
  }
}

module.exports = resError;
