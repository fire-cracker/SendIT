import express from 'express';
import {
  OrderValidation, orderLenght, emailvalidation, parcelIdValidation, orderPostIdValidation,
} from '../middleware/ordersValidation';
import controller from '../controllers/controller';

const router = express.Router();

// get all questions
router.get('/parcels', controller.getAllOrders);
router.get('/parcels/:parcelId', parcelIdValidation, controller.getOrder);
router.post('/parcels', OrderValidation, emailvalidation, orderLenght, controller.createOrder);
router.post('/parcels/:parcelId', orderPostIdValidation);
router.put('/parcels/:parcelId', OrderValidation, emailvalidation, orderLenght, controller.updateOrder);
router.delete('/parcels/:parcelId', parcelIdValidation, controller.deleteOrder);
router.delete('/parcels', orderPostIdValidation);

export default router;
