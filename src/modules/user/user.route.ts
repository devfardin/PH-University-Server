/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { AnyZodObject } from 'zod';
import auth from '../Auth/auth';
import { USER_ROLE } from './user.constant';
import validationRequest from '../../app/middlewares/validateRequest';
import { userValidation } from './user.validation';
import { upload } from '../../app/utils/sendImageToCloudinary';
import { AdminValidation } from '../Admin/admin.validation';
import { StudentValidations } from '../student/student.validation';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validationRequest(StudentValidations.createStudentValidationSchema),
  userController.createNewUser,
);
// Create Faculty
router.post('/create-faculty', userController.createFacultyIntoDB);

// Create Admin
router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(AdminValidation.createAdminValidationSchema),
  userController.createAdmin,
);

router.put(
  '/change-status/:id',
  auth(USER_ROLE.faculty),
  validationRequest(userValidation.changeUserStatusValidation),
  userController.changeUserStatus,
);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  userController.getMe,
);

export const UserRouters = router;
