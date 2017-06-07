
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  _id        : {
    type   : String,
    unique : true,
    default: shortid.generate
  },
  title      : String,
  tags       : {type: String, comment: '标签'},
  keywords   : String,
  coverImage : {type: String, default: '', comment: '图片'},
  discription: String,
  content    : {},
  date       : {type: Date, default: Date.now},
  updateDate : {type: Date, default: Date.now, comment: '更新时间'},
  author     : {type: String, comment: '文档作者'},
  ispublish  : {type: Boolean, default: false, comment: '是否发布'},
  isTop      : {type: Number, default: 0, comment: '是否推荐，默认不推荐 0为不推荐，1为推荐'},
  pviews     : {type: Number, default: 1, comment: '阅读量'},
  isoriginal : {type: Boolean, default: true, comment: '是否原创'}
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
