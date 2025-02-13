const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;

describe('User API Tests', () => {
    let token;

    it('should register a new user', (done) => {   
        request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User 11',
                email: 'test11@example.com',
                password: '123456'
            })
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should login the user', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'test4@example.com',
                password: '123456'
            })
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                done();
            });
    });
});
