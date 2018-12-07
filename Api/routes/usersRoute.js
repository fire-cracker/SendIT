// Import statements
import express from 'express';
import controller from '../controllers/usersController';
import {
  userValidation, userLength, emailvalidation, userPostIdValidation, userLogin,
} from '../middleware/usersValidation';
import { verifyUserToken, verifyAdmin } from '../middleware/auth';

const router = express.Router();


// Routes
router.get('/users', verifyUserToken, verifyAdmin, controller.getAllUsers);
router.post('/auth', verifyUserToken, controller.login);
router.post('/auth/login', userLogin, emailvalidation, controller.login);
router.post('/auth/signup', userValidation, userLength, emailvalidation, controller.signup);
router.post('/users/:userId', userPostIdValidation);
export default router;
