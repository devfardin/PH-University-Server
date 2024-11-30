import { TStudent } from '../student/student.inferface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  const createStudent = await Student.create(studentData);
  return createStudent;
};

// Export all function
export const StudentServices = {
  createStudentIntoDB,
};
