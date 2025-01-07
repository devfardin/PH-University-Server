import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import AppError from '../../app/errors/AppError';

const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const result = await userServices.createUsersIntoDB(
      userInfo.password,
      userInfo,
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

const getMe = catchAsync(async (req, res) => {

  const {userId, role} = req.user;
  const result = await userServices.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrived Succesfully',
    data: result,
  });
});
// Export All Controulles function
export const userController = {
  createNewUser,
  createFacultyIntoDB,
  getMe,
};
