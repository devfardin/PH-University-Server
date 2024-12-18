import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistrantion } from './semesterRegistration.interface';
import httpStatus from 'http-status';
import { SemesterRegistrationModel } from './semesterRegistration.model';
const createSemesterRegistratiiononIntoDB = async (
  payload: TSemesterRegistrantion,
) => {
  const academicSemester = payload?.academicSemester;

  // check if the semester is not esist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not Found');
  }

  // check already academic semester exist
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester is Already  Exists');
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
export const semesterRegistrationService = {
  createSemesterRegistratiiononIntoDB,
};
