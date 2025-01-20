import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

// Get All semester from Database
const GetAllAcademicSemesters = catchAsync(async (req, res) => {
  const query = req.query;

  const result =
    await AcademicSemesterServices.getAllAcademicSemesterFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
});

// Get single semester from database
const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleSemeserFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrived succesfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const body = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is Update Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  GetAllAcademicSemesters,
  getSingleSemester,
  updateAcademicSemester,
};
