/**
 * Created by liu10 on 2017/6/6.
 */

'use strict';

const Router  = require('koa-router');
const koaBody = require('koa-body');

const uploadCtrl = require('../controllers/upload');

const uploadParser = koaBody({
  multipart : true,
  // hash      : 'md5',
  formidable: {uploadDir: config.tmpDir}
});

const router = Router({
  prefix: '/'
});


router.post('upload', uploadParser, uploadCtrl.uploadFiles);

module.exports = router;
