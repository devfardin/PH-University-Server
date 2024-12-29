import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../app/config';
import { TUserRole } from '../user/user.interface';
import { User } from '../user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized User!',
      );
    }
    // check to valid token
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    //   checking if the user is exist
    const isUserExist = await User.isUserExistsByCustomId(userId);

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not Found');
    }

    //   checking if the user is already deleted
    if (isUserExist?.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is Deleted');
    }

    if (isUserExist?.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is block');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized user!',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
