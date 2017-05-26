
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
  discription: String,
  content    : {}
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
