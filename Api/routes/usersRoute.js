// Import statements
import express from 'express';
import controller from '../controllers/usersController';
import {
  userValidation, userLength, emailvalidation, userIdValidation, userPostIdValidation, userLogin,
} from '../middleware/usersValidation';
import { verifyUserToken, verifyAdmin } from '../middleware/auth';

const router = express.Router();


// Routes
router.get('/users', verifyUserToken, verifyAdmin, controller.getAllUsers);
router.get('/users/:userId', userIdValidation, verifyUserToken, controller.getUser);
router.post('/auth/login', userLogin, emailvalidation, controller.login);
router.post('/auth/signup', userValidation, userLength, emailvalidation, controller.signup);
router.post('/users/:userId', userPostIdValidation);
router.delete('/users/:userId', userIdValidation, verifyUserToken, controller.deleteUser);
router.delete('/users', userIdValidation);

export default router;
