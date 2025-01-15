import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidations } from './acedemicSemester.validation';
import auth from '../Auth/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create New Academic Semester in to DB
router.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
// get all academic semester from Database
router.get(
  '/',
  auth(USER_ROLE.admin),
  AcademicSemesterController.GetAllAcademicSemesters,
);

// get Single academic semester from Database
router.get('/:semesterId', AcademicSemesterController.getSingleSemester);

// update Academic semester into database
router.patch(
  '/:semesterId',
  validationRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRouters = router;
