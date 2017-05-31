/**
 * Created by liu10 on 2017/5/29.
 */

'use strict';

const lodash = require('lodash');

const errorMap = new Map();

errorMap.set('internalError', {statusCode: 500, code: -1, desc: '内部错误！'});
errorMap.set('success', {statusCode: 200, code: 0, desc: 'success！'});
errorMap.set('notFound', {statusCode: 404, code: 1, desc: '不存在！'});
errorMap.set('parameterError', {statusCode: 500, code: 2, desc: '参数错误！'});
errorMap.set('noPermission', {statusCode: 403, code: 3, desc: '没有权限，不可用！'});

// 根据错误名称获取错误信息
function getErrorInfo(errorName) {
  let errorInfo;

  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorInfo = errorMap.get('internalError');

    if (lodash.isError(errorName)) {
      errorInfo.desc = errorName.message || errorInfo.desc;
    } else {
      errorInfo.desc = errorName || errorInfo.desc;
    }
  }

  return errorInfo;
}

module.exports = getErrorInfo;
