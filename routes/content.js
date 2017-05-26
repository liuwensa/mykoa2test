/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const Router = require('koa-router');

const contentctrl = require('../controllers/content');

const router = Router({
  prefix: '/content'
});


router.get('/test', contentctrl.getContents);

module.exports = router;
