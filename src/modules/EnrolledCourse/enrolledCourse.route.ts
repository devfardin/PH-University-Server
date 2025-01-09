import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { EnrolledcourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../Auth/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validationRequest(
    EnrolledcourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.createEnrolledCourseIntoDB,
);
export const EnrolledCourseRouters = router;
