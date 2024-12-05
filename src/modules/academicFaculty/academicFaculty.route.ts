import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validationRequest from '../../app/middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// Route for create academic faculty
router.post(
  '/create-academic-faculty',
  validationRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);
router.get(
  '/:facultyId',
  validationRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validationRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);
router.get('/', academicFacultyController.getAllAcademicFaculties);
