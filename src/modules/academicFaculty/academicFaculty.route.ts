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
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validationRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);
router.get('/', academicFacultyController.getAllAcademicFaculties);
// Delete faculty from database
router.delete(
  '/:facultyId',
  academicFacultyController.deleteAcademicFacultyFromDB,
);

export const AcademicFacultyRoutes = router;
