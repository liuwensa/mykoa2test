/**
 * Created by liu10 on 2017/6/6.
 */

'use strict';

const fs   = require('fs-extra');
const path = require('path');
const gm   = require('gm');

Promise.promisifyAll(fs);
Promise.promisifyAll(gm.prototype);

module.exports = {
  uploadFiles
};

async function uploadFiles(ctx) {
  const files = ctx.request.body.files.file;

  if (files.size > 0) {
    const filePath  = files.path;
    const filePaths = files.path.split(path.sep);
    const fileName  = filePaths[filePaths.length - 1].replace('upload_', '');
    const fileSize  = files.size;

    const imgInfo = await gm(filePath).identifyAsync();

    const format = imgInfo.format;
    const size   = imgInfo.size;
    let geometry = imgInfo.Geometry;

    const ext = format.toLowerCase();

    const firstFile  = fileName.substring(0, 2);
    const secondFile = fileName.substring(2, 4);

    if (Array.isArray(geometry)) {
      geometry = geometry[0];
    }

    const newFilePath = `/${firstFile}/${secondFile}/${fileName}-${fileSize}-${geometry}.${ext}`;

    const newPath = path.join(config.uploadDir, newFilePath);


    /* eslint-disable */
    fs.mkdirsSync(path.dirname(newPath));
    fs.renameSync(filePath, newPath);
    /* eslint-enable */
    ctx.body = {
      filePath: newPath,
      fileSize: fileSize,
      size    : size,
      format  : format
    };
  } else {
    ctx.body = {
      status: false,
      msg   : '上传失败'
    }
  }
}
