const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async() => {
            const response = await request(app)
                .get('/contact')
                .expect(200)

            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', () => {
        it('should request an inexistent route /hello and return HTTP status 200 with Hello World!', async() => {
            const response = await request(app)
                .get('/hi')
                .expect(200)

            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {
        it('should login successfully and return HTTP status 200', async() => {
            const response = await await request(app)
                .post('/login')
                .send({ username: "Barreto", password: "123"})
                .expect(200)
            assert.deepStrictEqual(response.text, 'Logging has succeeded!')
        })
        it('should unauthorize a request with wrong credentials and return HTTP status 401', async() => {
            const response = await request(app)
                .post('/login')
                .send({ username: "Unknown", password: "1234"})
                .expect(401)

            assert.deepStrictEqual(response.text, 'Unauthorized')
        })      
    })
})