import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
// create department
router.post(
  '/create-academic-department',
  // validationRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);
// get all department
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
// get Single department
router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

// update department
router.patch(
  '/:departmentId',
  validationRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
