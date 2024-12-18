import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { semesterRegistrationValidationSchema } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();
router.post(
  '/create-semester-registration',
  validationRequest(
    semesterRegistrationValidationSchema.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistrationIntoDB,
);
export const semesterRegistrationRouters = router;
