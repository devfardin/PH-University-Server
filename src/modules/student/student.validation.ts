import { z } from 'zod';

// Create student validation shema
const NameValidationSchema = z.object({
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

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phoneNo: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: NameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      profileImage: z.string(),
      addmissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// update student validation schema

const UpdateNameValidationSchema = z.object({
  firstName: z
    .string()
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name Start a Capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const UpdateGuardianValidationSchema = z.object({
  fathersName: z.string().optional(),
  mothersName: z.string().optional(),
  phoneNo: z.string().optional(),
});

const UpdateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  relation: z.string().optional(),
  phoneNo: z.string().optional(),
});
const UpdateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: UpdateGuardianValidationSchema.optional(),
      localGuardian: UpdateLocalGuardianValidationSchema.optional(),
      profileImage: z.string().optional(),
      addmissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  UpdateStudentValidationSchema,
};
