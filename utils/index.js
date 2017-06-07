/**
 * Created by admin on 2017/6/7.
 */

'use strict';

const uuid      = require('node-uuid');
const lodash    = require('lodash');
const validator = require('validator');

module.exports = {
  uuid     : uuid,
  validator: validator,
  _        : lodash,

  myuuid: function () {
    return uuid().replace(/-/g, '');
  }
};
