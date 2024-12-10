/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  var errorSourses: TErrorSource = [
    {
      path: '',
      message: 'Someting want wrong',
    },
  ];

  const handleZodError = (error: ZodError) => {
    const statusCode = 400;
    const errorSourses: TErrorSource = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
    return {
      statusCode,
      message: 'validation error',
      errorSourses,
    };
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSourses;
  }

  // Ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSourses,
    stack: config.NODE_ENV === 'Development' ? error.stack : null,
    // error,
  });
};

export default globalErrorHandler;
