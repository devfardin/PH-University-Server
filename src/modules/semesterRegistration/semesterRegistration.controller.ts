import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';
import httpStatus from 'http-status';

const createSemesterRegistrationIntoDB = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.createSemesterRegistratiiononIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semseter Registration created',
    data: result,
  });
});
export const SemesterRegistrationController = {
  createSemesterRegistrationIntoDB,
};
