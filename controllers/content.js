/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const contentService = require('../services/content');

module.exports = {
  getContents
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