/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.status || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error,
  });
};

export default globalErrorHandler;
