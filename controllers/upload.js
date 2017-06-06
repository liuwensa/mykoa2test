/**
 * Created by liu10 on 2017/6/6.
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  uploadFiles
};

async function uploadFiles (ctx){
  const files = ctx.request.body.files.file;
  const arr = files.path.split('/');
  const str = arr[arr.length-1];
  const oldpath = path.join('/raid/uploadfiles', str);
  const newpath = path.join('/raid/uploadfiles', str + files.name);
  console.log(str, oldpath, newpath)
  return new Promise((resolve, reject) => {
    fs.rename(oldpath, newpath, function(err, res){
      if(err) {
        reject(err);
        return;
      }
      resolve()
    })
  }).then(function(){
    ctx.body = {
      status: true,
      path: '/' + arr[arr.length-1] + files.name
    }
  }).catch(function(err){
    console.log(err)
    ctx.body = {
      status: false,
      msg: '上传失败'
    }
  });
};