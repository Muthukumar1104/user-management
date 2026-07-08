import { z } from "zod";

export const signupSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, "First name is required")
            .max(50, "First name cannot exceed 50 characters"),

        lastName: z
            .string()
            .trim()
            .min(1, "Last name is required")
            .max(50, "Last name cannot exceed 50 characters"),

        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .pipe(
                z.email("Please enter a valid email address")
            ),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        confirmPassword: z
            .string()
            .min(1, "Confirm password is required"),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type SignupFormValues = z.infer<
    typeof signupSchema
>;