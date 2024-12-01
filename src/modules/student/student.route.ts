import express from 'express';
import { StudentControlles } from './student.controller';
import { StudentValidations } from './student.validation';
import validationRequest from '../../app/middlewares/validateRequest';
const router = express.Router();

router.post(
  '/',
  validationRequest(StudentValidations.createStudentValidationSchema),
  StudentControlles.createStudent,
);

export const StudentRoute = router;
