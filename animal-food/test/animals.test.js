import { equal } from 'assert';
import { app } from "../index.js";
import request from 'supertest'
import { assert } from 'chai'

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('get /hello', function () {
    it('should return hello world as message',
        async function () {
            const res = await request(app)
                .get('/hello')
                .expect(200)
                .expect('Content-Type', /json/)

            assert.equal(res.body.message, 'hello world')
        }
    )
})

describe('get /user before authentication', function () {
    it('should return no user',
        async function () {
            const res = await request(app)
                .get('/user')
                .expect(200)
                .expect('Content-Type', /json/)

            assert.equal(res.body.user, 'no user')
        }
    )
})