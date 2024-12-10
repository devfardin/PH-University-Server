import mongoose from 'mongoose';
import { TStudent } from '../student/student.inferface';
import { Student } from './student.model';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
// Create Student Into database
const createStudentIntoDB = async (studentData: TStudent) => {
  const createStudent = await Student.create(studentData);
  return createStudent;
};

// Get all student from database
const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
// get Student filter by id
const getSingleStudenFromDB = async (id: string) => {
  const result = await Student.findOne({ _id: id })
    .populate('user')
    .populate('addmissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({ id }, payload, { new: true });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.NOT_MODIFIED, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delted student');
  }
};
// Export all function
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudenFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
