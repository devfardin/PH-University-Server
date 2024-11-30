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
  // const message = error.message || 'Internal Server Error';

  res.status(500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error,
  });
};

export default globalErrorHandler;
