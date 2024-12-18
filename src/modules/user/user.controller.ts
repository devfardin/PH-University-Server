import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';

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
    // res.status(200).json({
    //   status: true,
    //   message: 'User Successfull created',
    //   data: result,
    // });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: false,
    //   message: 'User not created please check your detailes',
    //   error,
    // });
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
// Export All Controulles function
export const userController = {
  createNewUser,
  createFacultyIntoDB,
};
