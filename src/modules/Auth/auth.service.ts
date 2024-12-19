import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
const loginUser = async (payload: TLoginUser) => {
  //   checking if the user is exist

  const isUserExist = await User.isUserExistsByCustomId(payload.id);

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

  //  checking is the password is correct
  if (!(await User.isPasswordMatch(payload.password, isUserExist?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'User password do not match');
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  //   Access Granted: send access token

  return {
    accessToken,
    needsPasswordChhange: isUserExist?.needsPasswordChange,
  };
};
export const AuthServices = {
  loginUser,
};
