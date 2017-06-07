/**
 * Created by admin on 2017/5/26.
 */

'use strict';

global.shortid = require('shortid');
global.Promise = require('bluebird');
global.config  = require('config');

global.utils  = require('./utils');
global.logger = require('./logger').getLogger('main');
global.db     = require('./models');
