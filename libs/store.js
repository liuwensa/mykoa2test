/**
 * Created by admin on 2018/4/9.
 */

'use strict';

const Redis = require('ioredis');

class RedisStore {
  constructor(prefix, options) {
    this.prefix = prefix;
    this.redis  = new Redis(options);
  }

  async get(sid) {
    const key  = this.prefix + ':' + sid;
    const data = await this.redis.get(key);
    return JSON.parse(data);
  }

  async set(sid, session, maxAge) {
    const key   = this.prefix + ':' + sid;
    const jsess = JSON.stringify(session);
    const args  = [key, jsess];

    if (maxAge) {
      args.push('EX', maxAge);
    }
    await this.redis.set(args);
    return key;
  }

  async destroy(sid) {
    const key = this.prefix + ':' + sid;
    return await this.redis.del(key);
  }
}

module.exports = RedisStore;
