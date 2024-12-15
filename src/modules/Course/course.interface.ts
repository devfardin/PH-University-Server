import { Types } from 'mongoose';

export type TPreRequistteCourses = {
  course: Types.ObjectId,
  isDeleted: boolean,
};
export type TCourse = {
  title: string,
  prefix: string,
  code: number,
  preRequisiteCourses: [TPreRequistteCourses],
  credits: number,
  isDeleted: boolean,
};
