import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from './auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changepassword,
);
router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);
router.post(
  '/reset-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.resetPassword,
);
export const AuthRoutes = router;
