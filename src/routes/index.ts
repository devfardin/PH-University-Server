import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { StudentRoute } from '../modules/student/student.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { FacultyRouter } from '../modules/Faculty/faculty.route';
import { semesterRegistrationRouters } from '../modules/semesterRegistration/semesterRegistration.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { OfferedCourseRouter } from '../modules/OfferdCourse/OfferdCourse.route';
import { EnrolledCourseRouters } from '../modules/EnrolledCourse/enrolledCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRouters,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRouter,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
