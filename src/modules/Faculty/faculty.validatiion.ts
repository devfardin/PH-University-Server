import { z } from 'zod';

const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});
export const courseValidationSchema = {
  assignFacultiesWithCourseValidationSchema,
};
