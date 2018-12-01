import request from 'supertest';
import app from '../app';
import * as test from './model/ordersModel';


const inexistingUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJOYW1lIjoiYWJpbWJvbGFhZm9sYWJpIiwidXNlckVtYWlsIjoiYWJpbWJvbGFhZm9sYWJpQGFkZHJlc3MuY29tIiwidXNlclJvbGUiOiJVc2VyIiwiaWF0IjoxNTQyODAzMjQ2LCJleHAiOjE1NDI4MDY4NDZ9.sXNjND6kV1zqKQWuc1wKBCLrG01zEJgh2tsBxdHk-wg';
describe('Validate orders Route', () => {
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
    it('should be valid route /api/v1/parcels returns 200 (parcels retrieved successfully)', (end) => {
      request(app).get('/api/v1/parcels')
        .set('x-access-token', adminToken)
        .expect('Content-type', /json/)
        .expect((res) => {
          res.body.success = 'true';
          res.body.Status = 'parcels Retrieved Successfully';
          res.body.orders = test.databaseOrders;
        })
        .expect(200, end);
    });
    it('should be return "Forbidden Route, User not Authorised" when a user token tries to access a route with admin privilege', (end) => {
      request(app).get('/api/v1/parcels')
        .set('x-access-token', userToken)
        .expect('Content-type', /json/)
        .expect((res) => {
          res.body.auth = 'false';
          res.body.message = 'Forbidden Route, User not Authorised';
        })
        .expect(401, end);
    });
    describe('GET a single order', () => {
      it('should be valid route /api/v1/parcels/1 returns 200 (parcels retrieved successfully)', (end) => {
        request(app).get('/api/v1/parcels/1')
          .set('x-access-token', userToken)
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.success = 'true';
            res.body.Status = 'Order retrieved successfully';
          })
          .expect(200, end);
      });
      it('should be valid route is supplied to get all orders of a particular user returns 200 (parcels retrieved successfully)', (end) => {
        request(app).get('/api/v1/users/1/parcels')
          .set('x-access-token', userToken)
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.success = 'true';
            res.body.Status = 'Order retrieved successfully';
            res.body.parcels = test.orders;
          })
          .expect(200, end);
      });
      it('should be return "Failed to authenticate token" when an expired or non existing token is supplied', (end) => {
        request(app).get('/api/v1/parcels/1')
          .set('x-access-token', inexistingUser)
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
            res.body.message = 'Failed to authenticate token';
          })
          .expect(500, end);
      });
      it('should be return "No token provided" when no token is supplied', (end) => {
        request(app).get('/api/v1/parcels/1')
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.auth = 'false';
            res.body.message = 'No token provided';
          })
          .expect(403, end);
      });
      it('should be valid route /api/v1/users/1/parcels returns 200 (orders retrieved successfully)', (end) => {
        request(app).get('/api/v1/users/1/parcels')
          .set('x-access-token', userToken)
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.success = 'true';
            res.body.Status = 'Parcels Retrieved Successfully';
          })
          .expect(200, end);
      });
      it('should be return "Parcels Not Found in the Database" when an inexisting ID is supplied', (end) => {
        request(app).get('/api/v1/users/20/parcels')
          .set('x-access-token', userToken)
          .expect('Content-type', /json/)
          .expect((res) => {
            res.body.success = 'false';
            res.body.Status = 'Parcels Not Found in the Database';
          })
          .expect(404, end);
      });
      it('should return error 404(order not found in the database) if database does not have data at that location', (end) => {
        request(app).get('/api/v1/parcels/2000000')
          .set('x-access-token', adminToken)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.success = 'false';
            res.body.status = 'Order Not Found in the Database';
          })
          .expect(404, end);
      });
      describe('When non integer parcelId is sent', () => {
        it('should return statusCode of 403(Forbidden)', (end) => {
          request(app).get('/api/v1/parcels/A')
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.status = 'unsuccessful';
            })
            .expect(403, end);
        });
      });
    });
  });

  // Tests for the POST Route

  describe('Validate POST Route', () => {
    describe('When Correct input data is supplied', () => {
      it('should be valid /api/v1/parcels', (end) => {
        request(app).post('/api/v1/parcels/')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.firstOrder2)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'order Sent Successfully';
          })
          .expect(201, end);
      });
    });
    describe('When an parcelId sent to a post route', () => {
      it('should return statusCode of 400(Bad Request)', (end) => {
        request(app).post('/api/v1/parcels/10')
          .type('JSON').send(test.firstOrder)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.status = 'unsuccessful';
          })
          .expect(400, end);
      });
    });
    describe('Check POST input for Error', () => {
      it('should return Error status code 400 if no data was passed', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should return Error status code 400 if name of parcel sender is empty', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.noSender)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should return Error status code 400 if address of parcel sender is empty', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.noSenderAddress)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should not add name of parcel sender with numeric characters', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.badName3)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should not add name of parcel sender with more than 30 characters', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.badName2)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should not add name of parcel sender with less than 3 characters', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.badName)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should not add address of parcel sender with more than 150 characters', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.badAddress)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
      it('should not add address of parcel sender with less than 10 characters', (end) => {
        request(app).post('/api/v1/parcels')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.badAddress2)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.success = 'false';
            res.body.success.toLowerCase();
          })
          .expect(400, end);
      });
    });
  });

  // Tests for the PUT Route
  describe('Validate PUT Route', () => {
    describe('when Correct PUT Query is supplied for present location update', () => {
      it('should be valid route /api/v1/parcels/1/presentLocation edited successfully returning status code 200(Update Successful)', (end) => {
        request(app).put('/api/v1/parcels/1/presentLocation')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send(test.update)
          .expect((res) => {
            res.body.status = 'Update successful';
          })
          .expect(200, end);
      });
      it('present location returning status 410 if order not in database', (end) => {
        request(app).put('/api/v1/parcels/20/presentLocation')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send({
            presentLocation: 'University of Ibadan',
          })
          .expect((res) => {
            res.body.status = 'Order Not Found in the Database';
          })
          .expect(410, end);
      });
    });
    it('invalid present Location input returning status code 400(Bad Request)', (end) => {
      request(app).put('/api/v1/parcels/1/presentLocation')
        .set('x-access-token', adminToken)
        .type('JSON')
        .send({
          presentLocation: '',
        })
        .expect((res) => {
          res.body.Status = 'wrong input, do you mean Cancelled?';
        })
        .expect(400, end);
    });
    describe('when Correct PUT Query is supplied for statusupdate', () => {
      it('should be valid route /api/v1/parcels/1/status edited successfully returning status code 200(Status Update Successful)', (end) => {
        request(app).put('/api/v1/parcels/1/status')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send({
            orderStatus: 'Pending',
          })
          .expect((res) => {
            res.body.Status = 'Update successful';
          })
          .expect(200, end);
      });
      it(' status returning status 410 if order not in database', (end) => {
        request(app).put('/api/v1/parcels/20/status')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send({
            orderStatus: 'Pending',
          })
          .expect((res) => {
            res.body.Status = 'Order Not Found in the Database';
          })
          .expect(410, end);
      });
    });
    it('invalid status returning status code 400(Bad Request)', (end) => {
      request(app).put('/api/v1/parcels/2/status')
        .set('x-access-token', adminToken)
        .type('JSON')
        .send({
          orderStatus: 'new',
        })
        .expect((res) => {
          res.body.Status = 'wrong input, do you mean New or Pending or Delivered?';
        })
        .expect(400, end);
    });
    it('empty status input returning status code 400(Bad Request)', (end) => {
      request(app).put('/api/v1/parcels/2/status')
        .set('x-access-token', adminToken)
        .type('JSON')
        .send({
          orderStatus: '',
        })
        .expect((res) => {
          res.body.Status = 'status is required';
        })
        .expect(400, end);
    });
    describe('when Correct PUT Query is supplied for destinationupdate', () => {
      it('should be valid route /api/v1/parcels/1/destination edited successfully returning status code 200(Status Update Successful)', (end) => {
        request(app).put('/api/v1/parcels/1/destination')
          .set('x-access-token', userToken)
          .type('JSON')
          .send(test.update)
          .expect((res) => {
            res.body.Status = 'Update successful';
          })
          .expect(200, end);
      });
      it(' destination returning status 410 if order not in database', (end) => {
        request(app).put('/api/v1/parcels/4/destination')
          .set('x-access-token', userToken)
          .type('JSON')
          .send({
            toAddress: 'University of Ibadan',
          })
          .expect((res) => {
            res.body.Status = 'Order Not Found in the Database';
          })
          .expect(410, end);
      });
    });
    describe('when Correct PUT Query is supplied for cancel order', () => {
      it('should be valid route /api/v1/parcels/1/cancel edited successfully returning status code 200(Status Update Successful)', (end) => {
        request(app).put('/api/v1/parcels/2/cancel')
          .set('x-access-token', userToken)
          .type('JSON')
          .send({
            orderStatus: 'Cancelled',
          })
          .expect((res) => {
            res.body.Status = 'Cancel';
          })
          .expect(200, end);
      });
      it('invalid status returning status code 400(Bad Request)', (end) => {
        request(app).put('/api/v1/parcels/2/cancel')
          .set('x-access-token', userToken)
          .type('JSON')
          .send({
            orderStatus: 'cancelled',
          })
          .expect((res) => {
            res.body.Status = 'wrong input, do you mean Cancelled?';
          })
          .expect(400, end);
      });
      it('empty status input returning status code 400(Bad Request)', (end) => {
        request(app).put('/api/v1/parcels/2/cancel')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send({
            orderStatus: '',
          })
          .expect((res) => {
            res.body.Status = 'status is required';
          })
          .expect(400, end);
      });
      it('invalid destination input returning status code 400(Bad Request)', (end) => {
        request(app).put('/api/v1/parcels/1/destination')
          .set('x-access-token', userToken)
          .type('JSON')
          .send({
            toAddress: '',
          })
          .expect((res) => {
            res.body.Status = 'Bad Request';
          })
          .expect(400, end);
      });
      it(' returning status 410 if order not in database', (end) => {
        request(app).put('/api/v1/parcels/5/cancel')
          .set('x-access-token', userToken)
          .type('JSON')
          .send({
            orderStatus: 'Cancelled',
          })
          .expect((res) => {
            res.body.Status = 'Order Not Found in the Database';
          })
          .expect(410, end);
      });
    });
    describe('Check PUT input for Error', () => {
      it('should return 404(Not found, when an item in the body is missing)', (end) => {
        request(app).put('/api/v1/parcels/1')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send({})
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.Status = 'Bad Request';
            res.body.Status.toLowerCase();
          })
          .expect(404, end);
      });
      it('should return 400(Bad Request, when parcelId is undefined)', (end) => {
        request(app).put('/api/v1/parcels/ ')
          .type('JSON')
          .expect((res) => {
            res.body.Status = 'unsuccessful';
            res.body.Status.toLowerCase();
          })
          .expect(400, end);
      });
    });
    describe('Resolve Conflicts', () => {
      it('should return 404(Previous order not found, when memory has no data to modify)', (end) => {
        request(app).put('/api/v1/parcels/300')
          .set('x-access-token', adminToken)
          .type('JSON')
          .send(test.fullOrder)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.success = 'false';
            res.body.status = 'Order Not Found in the Database';
          })
          .expect(404, end);
      });
    });
  });
  // Tests for the DELETE Route
  describe('Validate DELETE Route', () => {
    describe('when Correct DELETE Query is supplied', () => {
      it('should be valid route /api/v1/parcels/1/ edited successfully returning status code 200(Update Successful)', (end) => {
        request(app).delete('/api/v1/parcels/1')
          .set('x-access-token', adminToken)
          .type('JSON')
          .expect((res) => {
            res.body.status = 'Order deleted successful';
          })
          .expect(200, end);
      });
      it(' status 404 if order not in database', (end) => {
        request(app).put('/api/v1/parcels/20')
          .set('x-access-token', adminToken)
          .type('JSON')
          .expect((res) => {
            res.body.status = 'Order Not Found in the Database';
          })
          .expect(404, end);
      });
      describe('When item can not be found in the database', () => {
        it('should return statusCode of 404(Order not found)', (end) => {
          request(app).delete('/api/v1/parcels/300')
            .set('x-access-token', adminToken)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.success = 'false';
              res.body.Status = 'Order Not Found in the Database';
            })
            .expect(404, end);
        });
      });
    });
    describe('When non integer parcelId is sent', () => {
      it('should return statusCode of 400(Bad Request)', (end) => {
        request(app).delete('/api/v1/parcels/A')
          .set('x-access-token', adminToken)
          .expect('Content-Type', /json/)
          .expect((res) => {
            res.body.status = 'unsuccessful';
          })
          .expect(400, end);
      });
    });
    describe('When parcel Id is not sent', () => {
      it('should return statusCode of 400(Bad Request)', (end) => {
        request(app).delete('/api/v1/parcels')
          .set('x-access-token', adminToken)
          .expect('Content-Type', /json/)
          .expect((res) => {
            console.log(res);
            res.body.status = 'unsuccessful';
          })
          .expect(400, end);
      });
    });
  });
});
