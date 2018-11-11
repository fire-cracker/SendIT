//Import statements
import express from 'express';
import Controller from '../controllers/usersController';
import Validate from '../middleware/usersValidation';
import {verifyUserToken, verifyAdmin} from '../middleware/auth';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateUserId = Validate.userIdValidation;
let postvalidation = Validate.PostIdValidation;


// Routes
router.get('/users',verifyUserToken, verifyAdmin, Controller.getAllUsers);
router.get('/users/:userId', validateUserId,verifyUserToken, Controller.getUser);
router.post('/auth/login', validate,verifyUserToken,Controller.login);
router.post('/auth/signup', validate, Controller.signup);
router.post('/users/:userId', verifyUserToken,postvalidation);
router.put('/users', validateUserId);
router.put('/users/:userId', validateUserId, validate, Controller.updateUser);
router.delete('/users/:userId', validateUserId,verifyUserToken, Controller.deleteUser);
router.delete('/users',  validateUserId);

export default router;