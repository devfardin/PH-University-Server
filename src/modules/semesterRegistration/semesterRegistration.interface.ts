import { Types } from 'mongoose';

export type TSemesterRegistrantion = {
  academicSemester: Types.ObjectId,
  status: 'UpComing' | 'ONGOING' | 'ENDED',
  startDate: Date,
  endDate: Date,
  minCredit: number,
  maxCredit: number,
};
