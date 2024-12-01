/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

const createStudent = catchAsync(async (req, res, next) => {
  const StudentInfo = req.body;
  const result = await StudentServices.createStudentIntoDB(StudentInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Successfully created',
    data: result,
  });
});

// export All controlles function
export const StudentControlles = {
  createStudent,
};
