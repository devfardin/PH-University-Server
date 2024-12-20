import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { facultyService } from './faculty.service';
import httpStatus from 'http-status';

const getALLFaculties = catchAsync(async (req, res) => {
  console.log('text', req.user);

  const result = await facultyService.allFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

export const facultyController = {
  getALLFaculties,
};
