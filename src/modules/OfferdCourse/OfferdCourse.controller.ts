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
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferdCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is successfuly updated',
    data: result,
  });
});
// const getAllOfferdCourseFromDB = catchAsync(async(req, res) => {

// });
// const getSingleOfferedCourseFromDB = catchAsync(async(res, res)=> {

// });
export const OfferdCourseController = {
  createOfferCourse,
  updateOfferedCourse,
  //   getAllOfferdCourseFromDB,
  //   getSingleOfferedCourseFromDB,
};
