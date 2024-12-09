import { TStudent } from '../student/student.inferface';
import { Student } from './student.model';

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
// Export all function
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudenFromDB,
};
