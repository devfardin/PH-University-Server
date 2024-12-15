import { CourseModel } from './course.mode';

const createCourses = async () => {
  const result = CourseModel.create();
  return result;
};
export const CourseService = {
  createCourses,
};
