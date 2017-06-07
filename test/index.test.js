/**
 * Created by liu10 on 2017/5/30.
 */

'use strict';

const supertest = require('supertest');
const chai      = require('chai');

const app = require('../app');

const expect  = chai.expect;
const request = supertest(app.listen());

describe('测试GET请求', () => {
  it('/content请求', (done) => {
    request
      .get('/content')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.msg).to.be.an('array');
        expect(res.body.code).to.be.an('number');
        expect(res.body.code).equal(200);
        done()
      });
  });

  it('测试/请求', (done) => {
    request
      .get('/')
      .expect(200)
      .end((err, res) => {
        done()
      })
  });
});


describe('测试POST请求', () => {
  it('测试/content请求', (done) => {
    request
      .post('/content')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.code).to.be.an('number');
        expect(res.body.code).equal(200);
        expect(res.body.msg).to.be.an('object');
        expect(res.body.msg._id).to.be.an('string');
        done()
      })
  })
});
