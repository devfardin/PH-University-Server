/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import auth from '../Auth/auth';
import { USER_ROLE } from './user.constant';
import validationRequest from '../../app/middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.post('/create-student', userController.createNewUser);
// Create Faculty
router.post('/create-faculty', userController.createFacultyIntoDB);

router.put(
  '/change-status/:id',
  auth(USER_ROLE.student),
  validationRequest(userValidation.changeUserStatusValidation),
  userController.changeUserStatus,
);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  userController.getMe,
);

export const UserRouters = router;
