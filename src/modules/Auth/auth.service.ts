import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

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

  //   Access Granted: send access token

  //   return isUserExist;
};
export const AuthServices = {
  loginUser,
};
