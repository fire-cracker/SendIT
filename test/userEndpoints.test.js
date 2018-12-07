import request from 'supertest';
import app from '../app';
import * as test from './model/usersModel';


const inexistingUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJOYW1lIjoiYWJpbWJvbGFhZm9sYWJpIiwidXNlckVtYWlsIjoiYWJpbWJvbGFhZm9sYWJpQGFkZHJlc3MuY29tIiwidXNlclJvbGUiOiJVc2VyIiwiaWF0IjoxNTQyODAzMjQ2LCJleHAiOjE1NDI4MDY4NDZ9.sXNjND6kV1zqKQWuc1wKBCLrG01zEJgh2tsBxdHk-wg';
describe('Validate Users Route', () => {
  let adminToken;
  let userToken;
  before((done) => {
    request(app).post('/api/v1/auth/login')
      .send({ userEmail: 'oyedejipeace@gmail.com', userPassword: 'oyedejipeace' })
      .end((err, res) => {
        adminToken = res.body.token;
      });
    request(app).post('/api/v1/auth/login')
      .send({ userEmail: 'testEmail@address.com', userPassword: 'P@ssword' })
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  // Tests for the GET Route
  describe('Validate GET Route', () => {
    it('should be valid route /api/v1/users returns 200 (users retrieved successfully)', (end) => {
      request(app).get('/api/v1/users')
        .set('x-access-token', adminToken)
        .expect('Content-type', /json/)
        .expect((res) => {
          res.body.success = 'true';
          res.body.status = 'Users Data retrieved successfully';
          res.body.users = test.databaseUsers;
        })
        .expect(200, end);
    });
    it('should be invalid route, for route not declared', (end) => {
      request(app).get('/api/v1/usesl')
        .set('x-access-token', adminToken)
        .expect('Content-type', /json/)
        .expect((res) => {
          res.body.error = '404';
          res.body.status = 'success';
        })
        .expect(404, end);
    });
    it('should show a welcome message at home route', (end) => {
      request(app).get('/api/v1')
        .set('x-access-token', adminToken)
        .expect('Content-type', /json/)
        .expect((res) => {
          res.body.status = 'connection successful';
          res.body.message = 'Welcome to Fast Food Fast!';
        })
        .expect(404, end);
    });
  });


  // Tests for the POST Route
  describe('Validate POST Route', () => {
    describe('User signup', () => {
      describe('When a user Attempts to register with correct data', () => {
        it('should save the data successfully', (end) => {
          request(app).post('/api/v1/auth/signup')
            .send(test.fullUser)
            .type('JSON')
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.status = 'User Sent Successfully';
            })
            .expect(201, end);
        });
      });
      it('should not register a new user with an already existing email', (end) => {
        request(app).post('/api/v1/auth/signup')
          .send(test.badNewUser)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(406, end);
      });
      it('should not register user with a wrong email format', (end) => {
        request(app).post('/api/v1/auth/signup')
          .send(test.wrongData)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      it('should not register user with an empty username field ', (end) => {
        request(app).post('/api/v1/auth/signup')
          .send(test.wrongData)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      it('should not register name with less than 3 characters', (end) => {
        request(app).post('/api/v1/auth/signup')
          .send(test.wrongMinLength)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      it('should not register name with more than 30 characters', (end) => {
        request(app).post('/api/v1/auth/signup')
          .send(test.wrongMaxLength)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
    });
    describe('User login', () => {
      it('should not login user with a wrong email format', (end) => {
        request(app).post('/api/v1/auth/login')
          .send(test.wrongData)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      it('should not register user with an empty email field ', (end) => {
        request(app).post('/api/v1/auth/login')
          .send(test.wrongData2)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      it('should not register user with an empty password field ', (end) => {
        request(app).post('/api/v1/auth/login')
          .send(test.wrongData3)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
          })
          .expect(400, end);
      });
      describe('When a user attempts to login with wrong password', () => {
        it('should return error 401', (end) => {
          request(app).post('/api/v1/auth/login')
            .send(test.fullUser2)
            .type('JSON')
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.auth = 'false';
            })
            .expect(401, end);
        });
      });
      describe('When a user attempts to login with correct details', () => {
        it('should login successfully', (end) => {
          request(app).post('/api/v1/auth/login')
            .set('x-access-token', userToken)
            .send(test.loginUser)
            .type('JSON')
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.auth = 'true';
            })
            .expect(200, end);
        });
      });
      describe('When a user attempts to login with correct details, but data does not exist in the database', () => {
        it('should not login successfully', (end) => {
          request(app).post('/api/v1/auth/login')
            .set('x-access-token', inexistingUser)
            .send(test.fullUser3)
            .type('JSON')
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.status = 'User Not Found in the Database';
            })
            .expect(404, end);
        });
      });
    });
    describe('When a userId is sent to a post route', () => {
      it('should return Error status code 400(Bad request)', (end) => {
        request(app).post('/api/v1/users/1')
          .set('x-access-token', userToken)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.status = 'unsuccessful';
            res.body.status.toLowerCase();
          })
          .expect(400, end);
      });
    });
  });
});
