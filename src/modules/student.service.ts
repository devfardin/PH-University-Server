import { Student } from './student/student.interface';
import { StudentModel } from './student/student.schema';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
 const getAllStudentsFromDB= async()=>{
const result = await StudentModel.find();
return result;
 }
export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
};
