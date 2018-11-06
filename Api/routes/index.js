import express from 'express';
import Validate from '../middleware/ordersValidation'
import Controller from '../controllers/controller';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateparcelId = Validate.parcelIdValidation;
let postvalidation = Validate.PostIdValidation

// get all questions
router.get('/parcels', Controller.getAllOrders);
router.get('/parcels/:parcelId',validateparcelId, Controller.getOrder);
router.post('/parcels',validate,Controller.createOrder);
router.post('/parcels/:parcelId', postvalidation,validate);
router.put('/parcels/:parcelId',validateparcelId, validate, Controller.updateOrder);
router.delete('/parcels/:parcelId', validateparcelId,Controller.deleteOrder);
router.delete('/parcels',  validateparcelId);

export default router;