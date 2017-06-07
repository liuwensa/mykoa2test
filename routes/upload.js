/**
 * Created by liu10 on 2017/6/6.
 */

'use strict';

const path = require('path');
const Router  = require('koa-router');
const koaBody = require('koa-body')({
  multipart: true,
  formidable: { uploadDir: '/raid/uploadfiles' }
});
const uploadCtrl = require('../controllers/upload');

const router = Router({
  prefix: '/'
});


router.post('upload', koaBody, uploadCtrl.uploadFiles);

module.exports = router;
