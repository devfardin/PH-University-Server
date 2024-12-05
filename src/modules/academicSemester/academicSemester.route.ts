import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidations } from './acedemicSemester.validation';

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
router.get('/', AcademicSemesterController.GetAllAcademicSemesters);

// get Single academic semester from Database
router.get('/:semesterId', AcademicSemesterController.getSingleSemester);

export const AcademicSemesterRouters = router;
