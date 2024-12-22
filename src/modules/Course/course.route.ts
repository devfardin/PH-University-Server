import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { CourseValidations } from './courses.validation';
import { courseController } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validationRequest(CourseValidations.createCourseValidationSchema),
  courseController.createCourses,
);
router.get('/', courseController.getAllCourse);
router.get('/:courseId', courseController.getSingleCourse);
router.patch('/:courseId', courseController.deleteCourse);

router.patch(
  '/course-update/:courseId',
  validationRequest(CourseValidations.updateCourseValidationSchema),
  courseController.courseUpdate,
);

router.put(
  '/:courseId/assign-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesWithCourseFromDB,
);

export const CourseRoutes = router;
