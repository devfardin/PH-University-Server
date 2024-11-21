import { Student } from './student/student.interface';
import { StudentModel } from './student/student.schema';

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(studentData);
  const student = new StudentModel(studentData);
  const result = await student.save(); // built in instance method provided by mongoose
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const reslut = await StudentModel.findOne({ id });
  return reslut;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudent,
};
