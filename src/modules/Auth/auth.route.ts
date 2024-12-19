import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
