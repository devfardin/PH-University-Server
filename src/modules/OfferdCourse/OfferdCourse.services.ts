import { TOfferedCourse } from './OfferdCourse.interface';
import { OfferdCourseModel } from './OfferdCourse.model';

const createOfferCourseIntoBD = async (payload: TOfferedCourse) => {
  const result = await OfferdCourseModel.create(payload);
  return result;
};
// const getAllOfferdCourseFromDB = async (query: Record<string, unknown>) => {};
// const getSingleOfferedCourseFromDB = async (id: string) => {};
// export all function
export const OfferdCourseService = {
  createOfferCourseIntoBD,
  //   getAllOfferdCourseFromDB,
  //   getSingleOfferedCourseFromDB,
};
