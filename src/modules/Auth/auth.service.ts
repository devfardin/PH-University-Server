import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
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
    userId: isUserExist?.id,
    role: isUserExist.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires as string,
  );
  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
  //   expiresIn: '10d',
  // });

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_token as string,
    config.jwt_refresh_expires as string,
  );

  //   Access Granted: send access token

  return {
    accessToken,
    refreshToken,
    needsPasswordChhange: isUserExist?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string, newPassword: string },
) => {
  //   checking if the user is exist
  const isUserExist = await User.isUserExistsByCustomId(userData.userId);

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
  if (
    !(await User.isPasswordMatch(payload.oldPassword, isUserExist?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'User password do not match');
  }

  // create new password as hashed password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_roounds),
  );
  // update user with new password
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};
const refreshToken = async (token: string) => {
  // if (!token) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized User!');
  // }
  // check to valid token
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_token as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  if (
    isUserExist.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(
      isUserExist.passwordChangeAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  // create token and sent to the client
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expires as string,
  );

  return {
    accessToken,
  };
};
const forgetPassword = async (id: string) => {
  //   checking if the user is exist
  const isUserExist = await User.isUserExistsByCustomId(id);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found');
  }

  //   checking if the user is already deleted
  if (isUserExist?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Deleted');
  }

  if (isUserExist?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
  );
  const resetUiLink = `http://localhost:6000?id=${isUserExist.id}&token=${resetToken}`;
  console.log(resetUiLink);
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
