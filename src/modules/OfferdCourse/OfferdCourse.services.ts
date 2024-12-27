import AppError from '../../app/errors/AppError';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { CourseModel } from '../Course/course.mode';
import { FacultyModel } from '../Faculty/faculty.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferdCourse.interface';
import { OfferdCourseModel } from './OfferdCourse.model';
import httpStatus from 'http-status';
import { hasTimeConflict } from './OfferedCourse.utils';
const createOfferCourseIntoBD = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
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
  const academicSemester = isSemesterRegistrationExits.academicSemester;

  // check Academic Faculty exists
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }
  // check Academic Department exists
  const isAcademicDepartmentExits =
    await AcademicDepartmentModel.findById(academicDepartment);
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
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found');
  }
  // check if the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not belong to this ${isAcademicFacultyExits.name}`,
    );
  }
  // check if the same offered course same section in same registered samester exists
  const isSameOfferedCourseExistsWithSameRegisteredSameSterWithSameSection =
    await OfferdCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (isSameOfferedCourseExistsWithSameRegisteredSameSterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course with same section is already registration',
    );
  }
  // get the secedule of the  faculties
  const assignedSchedules = await OfferdCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime'); // select which fileld fetch in the function
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This Faculty is not available at that time! choose other time or day`,
    );
  }
  const result = await OfferdCourseModel.create({
    ...payload,
    academicSemester,
  });
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
