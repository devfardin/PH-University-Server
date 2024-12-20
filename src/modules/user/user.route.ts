/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import auth from '../Auth/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  userController.createNewUser,
);
// Create Faculty
router.post('/create-faculty', userController.createFacultyIntoDB);

export const UserRouters = router;
