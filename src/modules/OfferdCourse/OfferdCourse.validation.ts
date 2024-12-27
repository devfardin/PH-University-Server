import { z } from 'zod';
import { Days } from './OfferdCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormat.test(time);
  },
  {
    message: 'Invalid Time format, Expected "HH:MM" in Hours formate',
  },
);
const creatreOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum(Days)),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`);
        const endTime = new Date(`1970-01-01T${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'Satrt time should be before end time',
      },
    ),
});
const updateOfferCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum(Days)),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`);
        const endTime = new Date(`1970-01-01T${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'Satrt time should be before end time',
      },
    ),
});
export const OfferdCourseValidation = {
  creatreOfferedCourseValidationSchema,
  updateOfferCourseValidationSchema,
};
