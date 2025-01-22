import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

const createNewUser: RequestHandler = async (req, res, next) => {
  const { password, student: studentData } = req.body;
  try {
    const result = await userServices.createUsersIntoDB(
      password,
      studentData,
      req.file,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Successfully created',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// Create Faculty
const createFacultyIntoDB = catchAsync(async (req, res) => {
  const facultyInfo = req.body;
  const result = await userServices.createFacultyIntoDB(
    facultyInfo.password,
    facultyInfo,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});
// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await userServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await userServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrived Succesfully',
    data: result,
  });
});
const changeUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await userServices.changeUserStatus(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
// Export All Controulles function
export const userController = {
  createNewUser,
  createFacultyIntoDB,
  getMe,
  changeUserStatus,
  createAdmin,
};
