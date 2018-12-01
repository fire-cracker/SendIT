import express from 'express';
import {
  OrderValidation, orderLength, emailValidation, parcelIdValidation,
  postIdValidation, statusValidation, locationValidation, addressValidation, cancelValidation,
} from '../middleware/ordersValidation';
import { userIdValidation } from '../middleware/usersValidation';
import controller from '../controllers/controller';
import { verifyUserToken, verifyAdmin } from '../middleware/auth';

const router = express.Router();


// Routes
router.get('/parcels', verifyUserToken, verifyAdmin, controller.getAllOrders);
router.get('/parcels/:parcelId', verifyUserToken, parcelIdValidation, controller.getOrder);
router.get('/users/:userId/parcels', verifyUserToken, userIdValidation, controller.userOrderHistory);
router.post('/parcels', verifyUserToken, OrderValidation, emailValidation, orderLength, controller.createOrder);
router.post('/parcels/:parcelId', postIdValidation);
router.put('/parcels/:parcelId/presentLocation', verifyUserToken, verifyAdmin, parcelIdValidation, locationValidation, controller.updateLocation);
router.put('/parcels/:parcelId/status', verifyUserToken, verifyAdmin, parcelIdValidation, statusValidation, controller.updateStatus);
router.put('/parcels/:parcelId/destination', verifyUserToken, parcelIdValidation, addressValidation, controller.updateDestination);
router.put('/parcels/:parcelId/cancel', verifyUserToken, parcelIdValidation, cancelValidation, controller.cancelOrder);
router.put('/parcels', parcelIdValidation);
router.delete('/parcels/:parcelId/', verifyUserToken, parcelIdValidation, controller.deleteOrder);
router.delete('/parcels', parcelIdValidation);
export default router;
