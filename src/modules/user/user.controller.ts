import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userInfo = req.body;
    const result = await userServices.createUsersIntoDB(
      userInfo.password,
      userInfo,
    );
    res.status(200).json({
      status: true,
      message: 'User Successfull created',
      data: result,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: false,
    //   message: 'User not created please check your detailes',
    //   error,
    // });
  }
};

// Export All Controulles function
export const userController = {
  createNewUser,
};
