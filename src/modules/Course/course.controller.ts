import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { CourseService } from './course.service';
import httpStatus from 'http-status';
const createCourses = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await CourseService.createCourses(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Successfully created',
    data: result,
  });
});
export const courseController = {
  createCourses,
};
