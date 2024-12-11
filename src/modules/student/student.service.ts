import mongoose from 'mongoose';
import { TStudent } from '../student/student.inferface';
import { Student } from './student.model';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { studentSearchAbleFields } from './student.constant';
// Create Student Into database
const createStudentIntoDB = async (studentData: TStudent) => {
  const createStudent = await Student.create(studentData);
  return createStudent;
};

// Get all student from database
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // const querySearchAbleFileds = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: querySearchAbleFileds.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // // Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('user')
  //   .populate('addmissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // // limitQuery
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // // paginateQuery
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // // field limiting
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
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
  const { name, guardian, localGuardian, ...remainingStudent } = payload;

  const modidiedUpdatedData: Record<string, unknown> = {
    ...remainingStudent,
  };

  // Update data for premetive or none premetive
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modidiedUpdatedData[`name.${key}`] = value;
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian))
      modidiedUpdatedData[`guardian.${key}`] = value;
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian))
      modidiedUpdatedData[`localGuardian.${key}`] = value;
  }
  const result = await Student.findOneAndUpdate({ id }, modidiedUpdatedData, {
    new: true,
  });
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
    throw new Error('Failed to deleted student');
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
