const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const dotenv = require('dotenv');
const path = require('path');
const { expect } = chai;

dotenv.config();

describe('Media API Tests', function() {
    this.timeout(15000);

    let token;
    let mediaId='67ae07473a638d7072ead740';

    before(function(done) {
        request(app)
            .post('/api/users/login')
            .send({
                email: process.env.TEST_USER_EMAIL,
                password: process.env.TEST_USER_PASSWORD
            })
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                token = res.body.token;
                done();
            });
    });

    it('should upload a new media', function(done) {
        this.timeout(10000); // Increase timeout for this test
        request(app)
            .post('/api/media')
            .send({
                title: 'Test Media',
                description: 'Description of Test Media',
                media_type: 'video',
                file_path: path.join(__dirname, '../content/backgroundvideo.mp4'),
                uploaded_by: 'Test User4'
            })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should get all media', function(done) {
        request(app)
            .get('/api/media')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should stream media by ID', (done) => {
      request(app)
          .get(`/api/media/stream/${mediaId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
              if (err) return done(err);
              done();
          });
  });
  
});
