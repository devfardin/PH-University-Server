import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

// Create Student in to Db
const createStudent = catchAsync(async (req, res) => {
  const StudentInfo = req.body;
  const result = await StudentServices.createStudentIntoDB(StudentInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Successfully created',
    data: result,
  });
});
// Get All student into Db
const getAllStudentFromDB = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});
// get Single Student from Database
const getSingleStudenFromDB = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudenFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });
});

// export All controlles function
export const StudentControlles = {
  createStudent,
  getAllStudentFromDB,
  getSingleStudenFromDB,
};
