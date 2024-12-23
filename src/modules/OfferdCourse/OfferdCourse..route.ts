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

export const OfferedCourseRouter = router;
