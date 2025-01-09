import AppError from '../../app/errors/AppError';
import { OfferdCourseModel } from '../OfferdCourse/OfferdCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import httpStatus from 'http-status';
import EnrolledCourseModel from './enrolledCourse.model';
import { Student } from '../student/student.model';
const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;
  // check if the offered course not exist
  const isOfferedCourseExist = await OfferdCourseModel.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offred course not found');
  }
  // check if the offred course max capacity is zero
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!');
  }
  // check if the student not exist
  const student = await Student.findOne({ id: userId }).select('id');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not found');
  }
  // check if the student alrady enrolled course
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student: student.id,
  });
  if (!isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student already enrolled!');
  }
};

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
};
