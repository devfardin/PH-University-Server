import express from 'express';
import { StudentControlles } from './student.controller';
import { StudentValidations } from './student.validation';
import validationRequest from '../../app/middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(StudentValidations.createStudentValidationSchema),
  StudentControlles.createStudent,
);
router.get('/', StudentControlles.getAllStudentFromDB);
router.get('/:studentId', StudentControlles.getSingleStudenFromDB);

export const StudentRoute = router;
