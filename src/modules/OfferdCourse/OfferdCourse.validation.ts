import { z } from 'zod';
import { Days } from './OfferdCourse.constant';

const creatreOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.number(),
    maxCapacity: z.number(),
    days: z.enum(Days),
    startTime: z.string(),
    endTime: z.string(),
  }),
});
export const OfferdCourseValidation = {
  creatreOfferedCourseValidationSchema,
};
