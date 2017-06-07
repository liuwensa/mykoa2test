/**
 * Created by admin on 2017/5/26.
 */

'use strict';

const Router = require('koa-router');

const contentctrl = require('../controllers/content');

const router = Router({
  prefix: '/content'
});

router.get('/', contentctrl.getContents);

router.post('/', contentctrl.addContent);


module.exports = router;
