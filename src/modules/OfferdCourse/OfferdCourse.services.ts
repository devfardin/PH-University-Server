import { TOfferedCourse } from './OfferdCourse.interface';
import { OfferdCourseModel } from './OfferdCourse.model';

const createOfferCourseIntoBD = async (payload: TOfferedCourse) => {
  const result = await OfferdCourseModel.create(payload);
  return result;
};

// export all function
export const OfferdCourseService = {
  createOfferCourseIntoBD,
};
