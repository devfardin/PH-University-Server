import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.services';
import httpStatus from 'http-status';

// Create academic facultie
const createAcademicFaculty = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await academicFacultyServices.createAcademicFacultyIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created Successfully',
    data: result,
  });
});

// get all academic faculties
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getALLAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties are retrieved successfull',
    data: result,
  });
});
// get single academic faculty by Id
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facultie Is Retrieved Successfully',
    data: result,
  });
});

// update academic faculty
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const body = req.body;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
