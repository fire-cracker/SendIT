import request from 'supertest';
import app from '../app';
import * as test from '../test/model/ordersModel';

// Tests for the GET Route
describe('Validate GET Route', () => {
    it('should be valid route /api/v1/orders returns 200 (orders retrieved successfully)', (end) => {
        request(app).get('/api/v1/orders')
            .expect("Content-type", /json/)
            .expect(function (res) {
                res.body.success = 'true';
                res.body.Status = "Orders Retrieved Successfully";
                res.body.orders = test.databaseOrders;
            })
            .expect(200, end)
    });

    describe('GET a single question', () => {
        it('should be valid route /api/v1/orders/1 returns 200 (orders retrieved successfully)', (end) => {
            request(app).get('/api/v1/orders/1')
                .expect("Content-type", /json/)
                .expect(function (res) {
                    res.body.success = 'true';
                    res.body.Status = "Order retrieved successfully";
                    res.body.orders = test.firstOrder;
                })
                .expect(200, end)
        });
        it('should return error 404(order not found in the database) if database does not have data at that location', (end) => {
            request(app).get('/api/v1/orders/2000000')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.status = "Order Not Found in the Database";
                })
                .expect(404, end)
        });
        describe("When non integer orderId is sent", () => {
            it('should return statusCode of 400(Bad Request)', (end) => {
                request(app).get('/api/v1/orders/A')
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        res.body.status = "unsuccessful";
                    })
                    .expect(400, end)
            });
        });
    });
});

// Tests for the POST Route
describe('Validate POST Route', () => {
    // describe("When Correct input data is supplied", () => {
    //     it('should be valid /api/v1/orders', (end) => {
    //         request(app).post('/api/v1/orders')
    //             .type("JSON")
    //             .send(test.fullOrder)
    //             .expect('Content-Type', /json/)
    //             .expect(function (res) {
    //                 res.body.Status = 'order Sent Successfully';
    //             })
    //             .expect(201, end)
    //     });
    // });
    describe("When an orderId sent to a post route", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).post('/api/v1/orders/10')
                .type('JSON').send(test.fullOrder)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe('Check POST input for Error', () => {
        it('should return Error status code 400 if no data was passed', (end) => {
            request(app).post('/api/v1/orders')
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
            request(app).post('/api/v1/orders')
                .type('JSON')
                .send(test.wrongDataType)
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
    //     it('should be valid route /api/v1/orders/1 editted successfully returning status code 200(Update Successful)', (end) => {
    //         request(app).put('/api/v1/orders/1')
    //             .type('JSON').send(test.fullOrder)
    //             .expect(function (res) {
    //                 res.body.Status = "Update successful";
    //             })
    //             .expect(200, end)
    //     });
    // });
    describe("When non integer orderId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).put('/api/v1/orders/A')
                .type('JSON').send(test.fullOrder)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("Check PUT input for Error", () => {
        it("should return 400(Bad request, when an item in the body is missing)", (end) => {
            request(app).put('/api/v1/orders/0')
                .type('JSON')
                .send({})
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.Status = "Bad Request";
                    res.body.Status.toLowerCase();
                })
                .expect(400, end);
        });
        it("should return 404(Bad Request, when orderId is undefined)", (end) => {
            request(app).put('/api/v1/orders/')
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
            request(app).put('/api/v1/orders/300')
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
    describe("When orderId is correctly supplied", () => {
        it('should return StatusCode 200(Order successfully deleted)', (end) => {
            request(app).delete('/api/v1/orders/1')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "true";
                    res.body.Status = "Order Deleted Successfuly";
                })
                .expect(200, end)
        });
    });
    describe("When item can not be found in the database", () => {
        it('should return statusCode of 404(Order not found)', (end) => {
            request(app).delete('/api/v1/orders/300')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.success = "false";
                    res.body.Status = "Order Not Found in the Database";
                })
                .expect(404, end)
        });
    });
    describe("When non integer orderId is sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/orders/A')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
    describe("When Order Id is not sent", () => {
        it('should return statusCode of 400(Bad Request)', (end) => {
            request(app).delete('/api/v1/orders')
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    res.body.status = "unsuccessful";
                })
                .expect(400, end)
        });
    });
});