/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const jwt = require;

module.exports = {
  index,
  test,
  login
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
    stateData: ctx.state,
    getData  : getData,
    postData : postData
  };
}

async function login(ctx, next) {
  const query    = ctx.request.body;
  const username = query.username;
  const password = query.password;

  if (!username) {
    return Promise.reject('username require');
  }
  if (!password) {
    return Promise.reject('password require');
  }

  const token = jwt.sign({uid: username, iat: Date.now()}, 'shared-secret', {expiresIn: '7d'});

  ctx.apiResults = {
    token: token
  };
}
