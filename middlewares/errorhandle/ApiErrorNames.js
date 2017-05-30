/**
 * Created by liu10 on 2017/5/29.
 */

'use strict';

/**
 * API错误名称
 */
const ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.NOT_EXIST = 'notExist';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.NOT_EXIST, { code: 101, message: '不存在' });

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
  let errorInfo;

  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR;
    errorInfo = errorMap.get(errorName);
  }

  return errorInfo;
};

module.exports = ApiErrorNames;
