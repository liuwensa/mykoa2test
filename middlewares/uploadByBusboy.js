/**
 * Created by admin on 2017/6/7.
 */

'use strict';

const path    = require('path');
const fs      = require('fs');
const Busboy  = require('busboy');
const inspect = require('util').inspect;

module.exports = {
  uploadFileByBusboy
};

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @return {promise}
 */
function uploadFileByBusboy(ctx, next) {
  const req    = ctx.req;
  const busboy = new Busboy({headers: req.headers});

  const files  = {};
  const fields = {};

  return new Promise((resolve, reject) => {
    // 解析请求文件事件
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      const fileName = utils.myuuid();
      const filePath = path.join(config.tmpDir, fileName);

      let fileSize = 0;

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(filePath));

      file.on('data', function (data) {
        fileSize = data.length;
      });

      // 文件写入事件结束
      file.on('end', function () {
        files.fileSize = fileSize;
        files.fileName = fileName;
        files.filePath = filePath;
        resolve();
      });
    });

    // 解析表单中其他字段信息
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      fields[fieldname] = inspect(val);
    });

    // 解析结束事件,文件上结束
    busboy.on('finish', function () {
      ctx.request.body.files  = files;
      ctx.request.body.fields = fields;
      resolve();
    });

    // 解析错误事件
    busboy.on('error', function (err) {
      logger.error('文件上出错：', err);
      reject(err);
    });

    req.pipe(busboy);
  })
    .then(() => next());
}
