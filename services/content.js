/**
 * Created by admin on 2017/5/26.
 */

'use strict';

module.exports = {
  getContents,
  addContent
};

/**
 * getContents
 * @returns {*}
 */
async function getContents() {
  return await db.Content.find();
}


/**
 * addContent
 * @param options
 */
async function addContent(options) {
  const newObj = new db.Content(options);
  return newObj.save();
}
