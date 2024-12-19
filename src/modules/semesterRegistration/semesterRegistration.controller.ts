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
// get all semester registration from database
const getAllSemesterRegistrationFromDB = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrived succesfully',
    data: result,
  });
});
// get single semester registration from database
const getSingleRegiistrationFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.getSingleRegiistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is retrived succesfully',
    data: result,
  });
});
const updateSemesterRegistrationIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  const result = await semesterRegistrationService.updateSemesterRegistration(
    id,
    updatedInfo,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is update succesfully',
    data: result,
  });
});
export const SemesterRegistrationController = {
  createSemesterRegistrationIntoDB,
  getSingleRegiistrationFromDB,
  getAllSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
