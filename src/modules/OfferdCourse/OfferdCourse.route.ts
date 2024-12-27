import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { OfferdCourseValidation } from './OfferdCourse.validation';
import { OfferdCourseController } from './OfferdCourse.controller';
const router = express.Router();
router.post(
  '/create-offered-course',
  validationRequest(
    OfferdCourseValidation.creatreOfferedCourseValidationSchema,
  ),
  OfferdCourseController.createOfferCourse,
);
router.patch(
  '/:id',
  validationRequest(OfferdCourseValidation.updateOfferCourseValidationSchema),
  OfferdCourseController.updateOfferedCourse,
);

export const OfferedCourseRouter = router;
