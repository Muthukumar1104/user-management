import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required"),

  lastName: z
    .string()
    .min(2, "Last name is required"),

  email: z
    .string()
    .email("Invalid email"),

  age: z.number().min(18, "Minimum age is 18"),

  status: z.enum([
    "Active",
    "Inactive",
  ]),
});

export type UserFormValues =
  z.infer<typeof userSchema>;