/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const contentService = require('../services/content');

module.exports = {
  getContents,
  addContent
};

/**
 * getContents
 * @param ctx
 * @param next
 * @returns {Promise.<TResult>}
 */
async function getContents(ctx, next) {
  const results = await contentService.getContents();
  ctx.body      = {
    code: 200,
    msg : results
  };
}

/**
 * 增加文档
 * @param {Object} ctx
 * @param {Object} next
 * @returns {Promise.<TResult>}
 */
async function addContent(ctx, next) {
  // const options = ctx.request.body;
  const options = {
    title      : '你从哪里来，我的朋友',
    tags       : '朋友,哪里',
    keywords   : '朋友',
    discription: '二级打怪',
    author     : '我的',
  };

  const results = await contentService.addContent(options);
  ctx.body      = {
    code: 200,
    msg : results
  };
}
