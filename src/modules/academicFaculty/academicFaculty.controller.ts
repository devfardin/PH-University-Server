import { createReadStream } from 'fs';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.services';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await academicFacultyServices.createAcademicFacultyIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is Successfully created',
    data: result,
  });
});

export const academicFacultyController = {
  createReadStream,
};
