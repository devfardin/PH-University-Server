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
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

// Academic semester update validation
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemsterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemseterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidations = {
  createAcdemicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
