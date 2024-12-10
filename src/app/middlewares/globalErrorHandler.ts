/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting for default values
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Someting want wrong';
  type TErrorSource = {
    path: string | number,
    message: string | number,
  }[];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Someting want wrong',
    },
  ];

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
  });
};

export default globalErrorHandler;
