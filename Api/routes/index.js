import express from 'express';
import Validate from '../middleware/ordersValidation'
import Controller from '../controllers/controller';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateOrderId = Validate.orderIdValidation;
let postvalidation = Validate.PostIdValidation

// get all questions
router.get('/api/v1/orders', Controller.getAllOrders);
router.get('/api/v1/orders/:orderId',validateOrderId, Controller.getOrder);
router.post('/api/v1/orders',validate,Controller.createOrder);
router.post('/api/v1/orders/:orderId', postvalidation,validate);
router.put('/api/v1/orders/:orderId',validateOrderId, validate, Controller.updateOrder);
router.delete('/api/v1/orders/:orderId', validateOrderId,Controller.deleteOrder);
router.delete('/api/v1/orders',  validateOrderId);

export default router;