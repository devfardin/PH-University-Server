import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.inferface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

// Create New user
const createUsersIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password does not given, use default password from env
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // Find Academic semester info
  const admisstionSemester = await AcademicSemester.findById(
    payload.addmissionSemester,
  );

  if (!admisstionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admition id not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admisstionSemester);

    // create a user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as a user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create new student');
  }

  // return
};

// export User Services function
export const userServices = {
  createUsersIntoDB,
};
