import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';
import httpStatus from 'http-status';

const createEnrolledCourseIntoDB = catchAsync(async (req, res) => {
  const body = req.body;
  const userId = req.user.userId;
  const reslut = await EnrolledCourseService.createEnrolledCourseIntoDB(
    userId,
    body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: reslut,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourseIntoDB,
};
