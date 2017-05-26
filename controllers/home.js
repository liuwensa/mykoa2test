/**
 * Created by admin on 2017/5/26.
 */

'use strict';

module.exports = {
  index,
  test
};

async function index(ctx, next) {
  await ctx.render('index', {title: 'my house!'});
}

async function test(ctx, next) {
  let getData  = ctx.request.query;
  let postData = ctx.request.body;
  ctx.body     = {
    getData : getData,
    postData: postData
  };
}