import { z } from 'zod';

export const loginUserSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address").trim().toLowerCase(),
    password: z.string().nonempty("Password is required"),
});

export type LoginUserDataType = z.infer<typeof loginUserSchema>;


export const registerUserSchema = z.object({
    name: z.string().trim().min(2, "Name must be atleast 2 character long."),

    userName: z.string().trim().min(3, "Name must be atleast 3 character long.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, number underscores and hyphens"),

    email: z.string().email("Please enter a valid email address").trim().max(255, "Email must not be exceeded 255 characters").toLowerCase(),

    password: z.string().min(8, "Password must be atleast 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must be contains atleast one lowercase, uppercase, and number"),

    role: z.enum(["applicant", "employer"], {
        error: "Role must be applicant or employer",
    }).default("applicant")
});

export type RegisterUserDataType = z.infer<typeof registerUserSchema>;

export const registerUserWithConfirmSchema = registerUserSchema.extend({
    confirmPassword: z.string()
}).refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type RegisterUserWithConfirmDataType = z.infer<typeof registerUserWithConfirmSchema>;