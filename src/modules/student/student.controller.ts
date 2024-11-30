import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const StudentInfo = req.body;
    const result = await StudentServices.createStudentIntoDB(StudentInfo);
    res.status(200).json({
      status: true,
      message: 'Student Successfull Created',
      data: result,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: false,
    //   message: 'Someting wrong please try again!',
    //   error,
    // });
  }
};

// export All controlles function
export const StudentControlles = {
  createStudent,
};
