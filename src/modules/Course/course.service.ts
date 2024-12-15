import { TCourse } from './course.interface';
import { CourseModel } from './course.mode';

const createCourses = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};
const getAllCourseFromDB = async () => {
  const result = await CourseModel.find();
  return result;
};
const getSingleCourseFromDB = async (courseId: string) => {
  const result = await CourseModel.findById(courseId);
  return result;
};
const deleteCourseFromDB = async (courseId: string) => {
  const result = await CourseModel.findOneAndUpdate(
    { _id: courseId },
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const CourseService = {
  createCourses,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
