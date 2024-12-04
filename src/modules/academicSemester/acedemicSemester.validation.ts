import { z } from 'zod';
import { AcademicSemsterName } from './academicSemester.model';

const createAcdemicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(AcademicSemsterName),
  }),
});

export const AcademicSemesterValidations = {
  createAcdemicSemesterValidationSchema,
};
