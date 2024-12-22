import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './OfferdCourse.interface';
import { Days } from './OfferdCourse.constant';

const offerCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Courses',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  days: {
    type: String,
    enum: Days,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});
export const OfferdCourseModel = model<TOfferedCourse>(
  'OfferdCourse',
  offerCourseSchema,
);
