'use strict';

const fs     = require('fs');
const path   = require('path');
const Router = require('koa-router');

const router   = Router();

fs// eslint-disable-line
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.includes('.js'));
  })
  .forEach(function (file) {
    let route = require(path.join(__dirname, file));// eslint-disable-line
    router.use(route.routes(), route.allowedMethods());
  });

module.exports = router;
