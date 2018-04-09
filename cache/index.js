'use strict';

const Redis = require('ioredis');

const redis = new Redis(config.redis);

redis.on('connect', () => {
  logger.info('redis连接成功！');
});

redis.on('error', (err) => {
  logger.error('redis连接失败！', err.message);
});


module.exports = {
  redis,
  hsetToRedis,
  hgetFromRedis,
  lpushToRedis,
  lpopFromRedis,
  rpopFromRedis,
  llenFromRedis
};

/**
 * hash set
 * @param {String} keyname
 * @param {String} field
 * @param {String} content
 * @param {Number} expire
 * @returns {Promise.<null>}
 */
async function hsetToRedis(keyname, field, content, expire) {
  await redis.hset(keyname, field, JSON.stringify(content));

  if (expire) {
    await redis.expire(keyname, expire);
  }
  return null;
}

/**
 * hash get
 * @param {String} keyname
 * @param {String} field
 * @returns {Promise.<void>}
 */
async function hgetFromRedis(keyname, field) {
  const data = await redis.hget(keyname, field);
  return JSON.parse(data);
}

/**
 * list lpush
 * @param {String} keyname
 * @param {Array|Number} arr
 * @param {Number} expire
 * @returns {Promise.<null>}
 */
async function lpushToRedis(keyname, arr, expire) {
  await redis.lpush(keyname, arr);

  if (expire) {
    await redis.expire(keyname, expire);
  }
  return null;
}

/**
 * list lpop
 * @param {String} keyname
 * @returns {Promise.<*>}
 */
async function lpopFromRedis(keyname) {
  return redis.lpop(keyname);
}

/**
 * list rpop
 * @param {String} keyname
 * @returns {Promise.<*>}
 */
async function rpopFromRedis(keyname) {
  return redis.rpop(keyname);
}

/**
 * list llen
 * @param {String} keyname
 * @returns {Promise.<*>}
 */
async function llenFromRedis(keyname) {
  return redis.llen(keyname);
}

