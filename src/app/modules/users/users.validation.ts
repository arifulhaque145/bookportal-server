import { z } from 'zod';
import { Roles } from './users.constant';

const enumRoles = Object.values(Roles) as [string, ...string[]];

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required!' }),
    role: z.enum(enumRoles),
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required!' }),
      lastName: z.string({ required_error: 'Last Name is required!' }),
    }),
    phoneNumber: z.string({ required_error: 'Phone number is required!' }),
    address: z.string({ required_error: 'Address is required!' }),
    budget: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginZodSchema,
};
