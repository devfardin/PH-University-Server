import AppError from '../../app/errors/AppError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { CourseModel } from '../Course/course.mode';
import { FacultyModel } from '../Faculty/faculty.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferdCourse.interface';
import { OfferdCourseModel } from './OfferdCourse.model';
import httpStatus from 'http-status';
const createOfferCourseIntoBD = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;
  // check semester registration exists
  const isSemesterRegistrationExits =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    );
  }
  // check Academic Faculty exists
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }
  // check Academic Department exists
  const isAcademicDepartmentExits =
    await AcademicFaculty.findById(academicDepartment);
  if (!isAcademicDepartmentExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found',
    );
  }
  // check Course exists
  const isCourseExits = await CourseModel.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }
  // check Faculty exists
  const isFacultyExits = await FacultyModel.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }
  const result = await OfferdCourseModel.create(payload);
  return result;
};
// const getAllOfferdCourseFromDB = async (query: Record<string, unknown>) => {};
// const getSingleOfferedCourseFromDB = async (id: string) => {};
// export all function
export const OfferdCourseService = {
  createOfferCourseIntoBD,
  //   getAllOfferdCourseFromDB,
  //   getSingleOfferedCourseFromDB,
};
