import config from '../../app/config';
import { TAcademicSemseter } from '../academicSemester/academicSemester.interface';
import { TStudent } from '../student/student.inferface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// Create New user
const createUsersIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password does not given, use default password from env
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // Generated student id
  const generateStudentId = (payload: TAcademicSemseter) => {

  };


  userData.id = generateStudentId();

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
