import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { OfferdCourseService } from './OfferdCourse.services';
const createOfferCourse = catchAsync(async (req, res) => {
  const result = await OfferdCourseService.createOfferCourseIntoBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Corse is created successfully!',
    data: result,
  });
});
export const OfferdCourseController = {
  createOfferCourse,
};
