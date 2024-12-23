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
    days: z.enum(Days),
    startTime: z.string(),
    endTime: z.string(),
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
