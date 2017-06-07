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
  uploadFileByKoaBody,
  uploadFilesByBusboy
};

/**
 * 上传图片，可多张图片上传
 * @param {Object} ctx
 */
async function uploadFileByKoaBody(ctx) {
  // const fields = ctx.request.body.fields;
  let files = ctx.request.body.files.file;

  if (!Array.isArray(files)) {
    files = [files];
  }

  const results = [];
  for (let i = 0, len = files.length; i < len; i++) {
    const filePath = files[i].path;
    const fileSize = files[i].size;
    const fileName = utils.myuuid();

    const options = {
      fileSize: fileSize,
      fileName: fileName,
      filePath: filePath
    };
    results.push(await saveFile(options));
  }
  ctx.body = results;
}

/**
 * Busboy包上传图片单张上传
 * @param {Object} ctx
 */
async function uploadFilesByBusboy(ctx) {
  // const fields = ctx.request.body.fields;
  const files = ctx.request.body.files;

  ctx.body = await saveFile(files);
}

/**
 * 临时文件重新命名重新分配目录
 * @param {Object} options
 */
async function saveFile(options) {
  const fileSize = options.fileSize;
  if (fileSize > 0) {
    const filePath = options.filePath;
    const fileName = options.fileName;

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

    return await {
      filePath: newPath,
      fileSize: fileSize,
      size    : size,
      format  : format
    };
  } else {
    return Promise.reject('上传失败，资源大小为0！')
  }
}


