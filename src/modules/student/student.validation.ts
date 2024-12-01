import { z } from 'zod';

const studentNameSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z]/.test(value), {
    message: 'First Name Start a Capital letter',
  }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fathersName: z.string(),
  mothersName: z.string(),
  phoneNo: z.string(),
});

const StudentLocalGuardian = z.object({
  name: z.string(),
  relation: z.string(),
  phoneNo: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: studentNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: StudentLocalGuardian,
      profileImage: z.string(),
      addmissionSemester: z.string(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
