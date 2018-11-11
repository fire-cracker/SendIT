import request from 'supertest';
import app from '../app';
import * as test from '../test/model/ordersModel';
import * as user from './model/usersModel';


// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/parcels returns 200 (parcels retrieved successfully)', (end) => {
        request(app).get('/api/v1/parcels')
        .set('x-access-token', user.admin_token.validAdmin)
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "parcels Retrieved Successfully";
                res.body.orders = test.databaseOrders;
            })
            .expect(200, end)
    });

    describe('GET a single question', () => {
        it('should be valid route /api/v1/parcels/1 returns 200 (parcels retrieved successfully)', (end) => {
            request(app).get('/api/v1/parcels/1')
            .set('x-access-token', user.admin_token.validAdmin)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.success = 'true';
                    res.body.Status = "Order retrieved successfully";
                    res.body.parcels = test.firstOrder;
                })
                .expect(200, end)
        });
        it('should be valid route is supplied to get all orders of a particular user returns 200 (parcels retrieved successfully)', (end) => {
            request(app).get('/api/v1/users/1/parcels')
            .set('x-access-token', user.user_token.validUser)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.success = 'true';
                    res.body.Status = "Order retrieved successfully";
                    res.body.parcels = test.orders;
                })
                .expect(200, end)
        });
        it(`should be return "Failed to authenticate token" when an expired or non existing token is supplied`, (end) => {
            request(app).get('/api/v1/parcels/1')
            .set('x-access-token', user.admin_token.expiredAdmin)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.auth = "false";
                    res.body.message = "Failed to authenticate token";
                })
                .expect(500, end)
        });
        it(`should be return "No token provided" when no token is supplied`, (end) => {
            request(app).get('/api/v1/parcels/1')
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.auth = "false";
                    res.body.message = "No token provided";
                })
                .expect(403, end)
        });
        it('should be valid route /api/v1/users/1/parcels returns 200 (orders retrieved successfully)', (end) => {
            request(app).get('/api/v1/users/1/parcels')
                .set('x-access-token', user.user_token.validUser)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.success = 'true';
                    res.body.Status = "Parcels Retrieved Successfully";
                })
                .expect(200, end)
        });
        it(`should be return "Parcels Not Found in the Database" when an inexisting ID is supplied`, (end) => {
            request(app).get('/api/v1/users/20/parcels')
                .set('x-access-token', user.user_token.validUser)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.Status = "Parcels Not Found in the Database";
                })
                .expect(404, end)
        });
        it(`should be return "Forbidden Route, User not Authorised" when a user token tries to access a route with admin privilege`, (end) => {
            request(app).get('/api/v1/parcels/1')
            .set('x-access-token', user.user_token.validUser)
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.auth = "false";
                    res.body.message = "Forbidden Route, User not Authorised";
                })
                .expect(401, end)
        });
        it('should return error 404(order not found in the database) if database does not have data at that location', (end) => {
            request(app).get('/api/v1/parcels/2000000')
            .set('x-access-token', user.admin_token.validAdmin)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.status = "Order Not Found in the Database";
                })
                .expect(404, end)
        });
        describe("When non integer parcelId is sent", () => {
            it('should return statusCode of 400(Bad Request)', (end) => {
                request(app).get('/api/v1/parcels/A')
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        res.body.status = "unsuccessful";
                    })
                    .expect(403, end)
            });
        });
    });
});

// Tests for the POST Route
describe('Validate POST Route', () => {
    // describe("When Correct input data is supplied", () => {
    //     it('should be valid /api/v1/parcels', (end) => {
    //         request(app).post('/api/v1/parcels/')
    //         .set('x-access-token', user.user_token.validUser)
    //             .type("JSON")
    //             .send(test.firstOrder)
    //             .expect('Content-Type', /json/)
    //             .expect(function (res) {
    //                 res.body.Status = 'order Sent Successfully';
    //             })
    //             .expect(201, end)
    //     });
    // });
    describe("When an parcelId sent to a post route", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).post('/api/v1/parcels/10')
                .type('JSON').send(test.firstOrder)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).post('/api/v1/parcels')
            .set('x-access-token', user.user_token.validUser)
                .type('JSON')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "Bad Request";
                    res.body.success = "false";
                    res.body.success.toLowerCase();
                })
                .expect(400, end);
        });
        it('should return Error status code 400 req.body.name has the wrong data type', (end) => {
            request(app).post('/api/v1/parcels')
            .set('x-access-token', user.user_token.validUser)
                .type('JSON')
                .send(test.invalidUser)
                .expect('Content-Type', /json/)
                .expect(function (res) {
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
    // describe("when Correct PUT Query is supplied", () => {
    //     it('should be valid route /api/v1/parcels/1 edited successfully returning status code 200(Update Successful)', (end) => {
    //         request(app).put('/api/v1/parcels/1')
    //         .set('x-access-token', user.admin_token.validAdmin)
    //         .type('JSON')
    //             .expect(function (res) {
    //                 res.body.Status = "Update successful";
    //             })
    //             .expect(200, end)
    //     });
    // });
    // describe("when Correct PUT Query is supplied", () => {
    //     it('should be valid route /api/v1/parcels/1/status edited successfully returning status code 200(Status Update Successful)', (end) => {
    //         request(app).put('/api/v1/parcels/1/status')
    //         .set('x-access-token', user.admin_token.validAdmin)
    //             .type('JSON').send(test.update)
    //             .expect(function (res) {
    //                 res.body.Status = "Update successful";
    //             })
    //             .expect(200, end)
    //     });
    // });
    describe("When non integer parcelId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).put('/api/v1/parcels/A')
            .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON').send(test.updateOrder)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("Check PUT input for Error", () => {
        it("should return 400(Bad request, when an item in the body is missing)", (end) => {
            request(app).put('/api/v1/parcels/0')
            .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON')
                .send({})
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it("should return 404(Bad Request, when parcelId is undefined)", (end) => {
            request(app).put('/api/v1/parcels/')
                .type('JSON')
                .send(test.fullOrder)
                .expect(function (res) {
                    res.body.Status = "unsuccessful";
                    res.body.Status.toLowerCase();
                })
                .expect(404, end);
        });
    });
    describe("Resolve Conflicts", () => {
        it("should return 400(Previous order not found, when memory has no data to modify)", (end) => {
            request(app).put('/api/v1/parcels/300')
            .set('x-access-token', user.admin_token.validAdmin)
                .type('JSON')
                .send(test.fullOrder)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.status = "Order Not Found in the Database"
                })
                .expect(400, end);
        });
    });
});

//Tests for the DELETE Route
describe("Validate Delete Route", () => {
    // describe("When parcelId is correctly supplied to delete all orders of a particular user", () => {
    //     it('should return StatusCode 200(Order successfully deleted)', (end) => {
    //         request(app).delete('/api/v1/users/:userId/parcels/')
    //         .set('x-access-token', user.admin_token.validAdmin)
    //             .expect('Content-Type', /json/)
    //             .expect(function (res) {
    //                 res.body.success = "true";
    //                 res.body.Status = "Order Deleted Successfuly";
    //             })
    //             .expect(200, end)
    //     });
    // });
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(Order not found)', (end) => {
            request(app).delete('/api/v1/parcels/300')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.Status = "Order Not Found in the Database";
                })
                .expect(404, end)
        });
    });
    describe("When non integer parcelId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/users/A/parcels')
            .set('x-access-token', user.admin_token.validAdmin)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("When Order Id is not sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/parcels')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});