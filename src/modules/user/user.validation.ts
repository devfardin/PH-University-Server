import { z } from 'zod';
import { UserStatus } from './user.constant';
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more then 20 characters' })
    .optional(),
});
const changeUserStatusValidation = z.object({
  body: z.object({
    status: z.enum([...UserStatus]),
  }),
});
export const userValidation = {
  userValidationSchema,
  changeUserStatusValidation,
};
