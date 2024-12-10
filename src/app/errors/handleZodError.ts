import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errorSourses: TErrorSources = error.issues.map((issue: ZodIssue) => {
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

export default handleZodError;
