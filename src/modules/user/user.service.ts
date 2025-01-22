/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.inferface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { FacultyModel } from '../Faculty/faculty.model';
import { sendImageToCloudinary } from '../../app/utils/sendImageToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { USER_ROLE } from './user.constant';
import { AdminModel } from '../Admin/admin.model';

// Create New user
const createUsersIntoDB = async (password: string, payload: TStudent, file: any ) => {
  const userData: Partial<TUser> = {};

  // if password does not given, use default password from env
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  // set student email
  userData.email = payload.email;

  // Find Academic semester info
  const admisstionSemester = await AcademicSemester.findById(
    payload?.addmissionSemester,
  );

  if (!admisstionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester id not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admisstionSemester);

    // send image to cloudinary
    const imageName = `${userData?.id}${payload?.name?.firstName}`;
    const path = file.path;
    
    // Upload image in the img hosting server
   const result  = await sendImageToCloudinary(imageName, path);

    // create a user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as a user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage =(result as { secure_url: string }).secure_url;
    
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
  // return
};
// Create Facult in DB
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  // if password not getActiveResourcesInfo, user default
  userData.password = password || (config.default_password as string);
  // set Faculty role
  userData.role = 'faculty';

  // set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    // create a user transaction -1
    const newUser = await User.create([userData], { session });

    // create a Faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a faculty (transaction-2)
    const newFaculty = await FacultyModel.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new error(error);
  }
};

const createAdminIntoDB = async (
  file: any,
  password:string,
  payload: TAdmin
) => {
  // create user object
  const userData: Partial<TUser> = {};

  // if password is not getEnvironmentData, use default password
  userData.password = password || (config.default_password as string);

  // set admin role
  userData.role = USER_ROLE.admin;
  
  // set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set id generation
    userData.id = await generateAdminId();
    const imageName = `${userData.id}-${payload.name.firstName}`;
    const path = file.path;
    // sendImage to cloudinary
    const result  = await sendImageToCloudinary(imageName, path);

    // create a user
    const newUser = await User.create([userData], {session});
    
    // create admin
    if(!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profile = (result as { secure_url: string }).secure_url;
    
    // create admin
    const newAdmin = await AdminModel.create([payload], {session});

    if(!newAdmin.length){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error( error)
  }
}

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    // result = await AdminModel.findOne({ id: userId });
  }
  if (role === 'faculty') {
    result = await FacultyModel.findOne({ id: userId });
  }
  return result;
};

const changeUserStatus = async (id: string, payload: { status: string }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid ID');
  }
  const isExistUser = await User.findById(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User are not found');
  }
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// export User Services function
export const userServices = {
  createUsersIntoDB,
  createFacultyIntoDB,
  getMe,
  changeUserStatus,
  createAdminIntoDB,
};
