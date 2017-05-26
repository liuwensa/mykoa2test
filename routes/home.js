/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const Router = require('koa-router');

const homectrl = require('../controllers/home');

const router = Router({
  prefix: '/'
});

router.get('/', homectrl.index);

router.get('test', homectrl.test);

module.exports = router;
