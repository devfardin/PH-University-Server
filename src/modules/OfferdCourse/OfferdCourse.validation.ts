import { z } from 'zod';
import { Days } from './OfferdCourse.constant';

const creatreOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    section: z.number(),
    maxCapacity: z.number(),
    days: z.array(z.enum(Days)),
    startTime: z.string().refine(
      (time) => {
        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeFormat.test(time);
      },
      {
        message: 'Invalid Time format, Expected "HH:MM" in Hours formate',
      },
    ),
    endTime: z.string().refine(
      (time) => {
        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeFormat.test(time);
      },
      {
        message: 'Invalid Time format, Expected "HH:MM" in Hours formate',
      },
    ),
  }),
});
const updateOfferCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum(Days).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});
export const OfferdCourseValidation = {
  creatreOfferedCourseValidationSchema,
  updateOfferCourseValidationSchema,
};
