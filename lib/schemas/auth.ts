import { z } from 'zod'

export const signUpSchema = z.object({
    firstName: z.string().trim().min(1, "First name is requird"),
    lastName: z.string().trim().min(1, "Last name is requird"),
    email: z.email("Enter a valid email id.").trim().min(1, "Email is requird"),
    password: z.string().trim().min(1, "Password is requird").min(8, 'Password must be at least 8 characters long.'),
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.email("Enter a valid email id.").trim().min(1, "Email is requird"),
    password: z.string().trim().min(1, "Password is requird").min(8, 'Password must be at least 8 characters long.'),
});

export type SignInFormSchema = z.infer<typeof signInSchema>;

export const codeSchema = z.object({
    code: z.string().min(1, "Enter the verification code."),
});

export type CodeFormSchema = z.infer<typeof codeSchema>;