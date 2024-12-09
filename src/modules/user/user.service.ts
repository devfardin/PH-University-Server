import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.inferface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { generateStudentId } from './user.utils';

// Create New user
const createUsersIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password does not given, use default password from env
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // Find Academic semester info
  const admisstionSemester = await AcademicSemester.findById(
    studentData.addmissionSemester,
  );
  if (!admisstionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'admition id not found');
  }

  userData.id = await generateStudentId(admisstionSemester);

  // create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    // set id, _id as a user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  // return
};

// export User Services function
export const userServices = {
  createUsersIntoDB,
};
