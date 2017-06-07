/**
 * Created by liu10 on 2017/6/6.
 */

'use strict';

const Router  = require('koa-router');
const koaBody = require('koa-body');

const uploadCtrl     = require('../controllers/upload');
const uploadByBusboy = require('../middlewares/uploadByBusboy');

const koaBodyParser = koaBody({
  multipart : true,
  // hash      : 'md5',
  formidable: {uploadDir: config.tmpDir}
});

const router = Router({
  prefix: '/upload'
});

router.post('/koabody', koaBodyParser, uploadCtrl.uploadFileByKoaBody);
router.post('/busboy', uploadByBusboy.uploadFileByBusboy, uploadCtrl.uploadFilesByBusboy);

module.exports = router;
