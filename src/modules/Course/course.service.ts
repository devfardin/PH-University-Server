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
  const result = await CourseModel.findById(courseId).populate(
    'preRequisiteCourses.course',
  );
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
const updateCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  // step 1L basic course info update
  const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    courseId,
    courseRemainingData,
    { new: true, runValidators: true },
  );
  // check if there is any pre requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    const deletedPreRequisitesCourses = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisites } },
        },
      },
    );
  }
  // filter out the new course fields
  const newPreRequisites = preRequisiteCourses?.filter(
    (el) => el.course && !el.isDeleted,
  );
  console.log(newPreRequisites);

  return updatedBasicCourseInfo;
};
export const CourseService = {
  createCourses,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
