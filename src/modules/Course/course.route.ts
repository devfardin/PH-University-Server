import express from 'express';
import validationRequest from '../../app/middlewares/validateRequest';
import { CourseValidations } from './courses.validation';
import { courseController } from './course.controller';
import auth from '../Auth/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validationRequest(CourseValidations.createCourseValidationSchema),
  courseController.createCourses,
);
router.get('/', courseController.getAllCourse);
router.get('/:courseId', courseController.getSingleCourse);
router.patch('/:courseId', courseController.deleteCourse);

router.patch(
  '/course-update/:courseId',
  auth(USER_ROLE.admin),
  validationRequest(CourseValidations.updateCourseValidationSchema),
  courseController.courseUpdate,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  validationRequest(CourseValidations.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesWithCourseFromDB,
);

export const CourseRoutes = router;
