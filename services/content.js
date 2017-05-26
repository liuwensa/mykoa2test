/**
 * Created by admin on 2017/5/26.
 */

'use strict';

module.exports = {
  getContents
};

/**
 * getContents
 * @returns {*}
 */
async function getContents() {
  return await db.Content.find();
}
