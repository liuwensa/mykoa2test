/**
 * Created by admin on 2017/5/26.
 */

'use strict';

module.exports = {
  index,
  test
};

async function index(ctx, next) {
  ctx.state = {
    title: 'my house!'
  };
  await ctx.render('index');
}

async function test(ctx) {
  let getData  = ctx.request.query;
  let postData = ctx.request.body;

  ctx.apiResults = {
    getData : getData,
    postData: postData
  };
}
