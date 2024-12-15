import QueryBuilder from '../../app/builder/QueryBuilder';
import { CourseSearchAbleFields } from './course.constant';
import { TCourse } from './course.interface';
import { CourseModel } from './course.mode';

const createCourses = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
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
