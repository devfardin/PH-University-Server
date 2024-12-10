/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  //  default validation haldler
  let errorSourses: TErrorSources = [
    {
      path: '',
      message: 'Someting want wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSourses = simplifiedError.errorSourses;
  } else if (error?.name == 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSourses = simplifiedError?.errorSources;
  }

  // Ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSourses,
    // error,
    stack: config.NODE_ENV === 'Development' ? error.stack : null,
  });
};

export default globalErrorHandler;
