import { z } from 'zod';
import { SemesterRggistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(SemesterRggistrationStatus),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
export const semesterRegistrationValidationSchema = {
  createSemesterRegistrationValidationSchema,
};
