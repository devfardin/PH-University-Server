import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidations } from './acedemicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRouters = router;
