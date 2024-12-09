class AppError extends Error {
  statusCode: number; // statuscode should be public but by default it public
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default AppError;
