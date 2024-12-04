import { z } from 'zod';
import {
  AcademicSemseterCode,
  AcademicSemsterName,
  Months,
} from './academicSemester.constant';

const createAcdemicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemsterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemseterCode] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidations = {
  createAcdemicSemesterValidationSchema,
};
