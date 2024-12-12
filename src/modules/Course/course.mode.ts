import { model, Schema } from 'mongoose';
import { TCourse, TPreRequistteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequistteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: '',
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: [true, 'Course pre requisited courses is required'],
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, 'Course prefix is required'],
    trim: true,
  },
  code: {
    type: Number,
    trim: true,
    required: [true, 'Course code is required'],
  },
  credits: {
    type: Number,
    requierd: [true, 'Course Credits is required'],
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});
export const CourseModel = model<TCourse>('Courses', courseSchema);
