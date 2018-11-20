import express from 'express';
import Validate from '../middleware/ordersValidation'
import userCheck from '../middleware/usersValidation';
import Controller from '../controllers/controller';
import {verifyUserToken, verifyAdmin} from '../middleware/auth';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateparcelId = Validate.parcelIdValidation;
let postvalidation = Validate.PostIdValidation
let Validatelocation = Validate.locationValidation
let validateStatus = Validate.statusValidation
let validateAddress = Validate.addressValidation

// Routes
router.get('/parcels',verifyUserToken, verifyAdmin, Controller.getAllOrders);
router.get('/parcels/:parcelId',verifyUserToken,verifyAdmin,validateparcelId, Controller.getOrder);
router.get('/users/:userId/parcels', verifyUserToken, userCheck.userIdValidation, Controller.userOrderHistory);
router.post('/parcels',verifyUserToken,validate,Controller.createOrder);
router.post('/parcels/:parcelId', postvalidation,validate);
router.put('/parcels/:parcelId',verifyUserToken, verifyAdmin,validateparcelId, validate, Controller.updateOrder);
// router.put('/users/:userId/parcels/:parcelId',verifyUserToken, verifyAdmin,validateparcelId, validate, Controller.updateOrder);
router.put('/parcels/:parcelId/presentLocation',verifyUserToken, verifyAdmin,validateparcelId, Validatelocation, Controller.updateLocation);
router.put('/parcels/:parcelId/status',verifyUserToken, verifyAdmin,validateparcelId, validateStatus, Controller.updateStatus);
router.put('/parcels/:parcelId/destination',verifyUserToken,validateparcelId, validateAddress, Controller.updateDestination);
router.put('/parcels/:parcelId/cancel',verifyUserToken,validateparcelId, Controller.deleteOrder);
// router.delete('/parcels/:parcelId', validateparcelId,Controller.deleteOrder);
router.delete('/users/:userId/parcels/',verifyUserToken, verifyAdmin, userCheck.userIdValidation,Controller.deleteUserOrder);
router.delete('/parcels', validateparcelId);


export default router;