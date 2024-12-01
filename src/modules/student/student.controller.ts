import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

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

// export All controlles function
export const StudentControlles = {
  createStudent,
};
