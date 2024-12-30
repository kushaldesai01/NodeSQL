import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const signupSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "name must be of type string", required_error: "name required" })
      .min(1, "name required"),
    email: z
      .string({ invalid_type_error: "email must be of type string", required_error: "email required" })
      .min(1, "email required")
      .email("Invalid email format"),
    password: z
      .string({ invalid_type_error: "password must be of type string", required_error: "password required" })
      .min(1, "password required")
      .regex(
        passwordRegex,
        "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    confirm_password: z
      .string({
        invalid_type_error: "confirm password must be of type string",
        required_error: "confirm password required",
      })
      .min(1, "confirm password required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "password and confirm password must be same",
    path: ["confirm_password"],
  });
export type signupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: "email must be of type string", required_error: "email required" })
    .min(1, "email required")
    .email("Invalid email format"),
  password: z
    .string({ invalid_type_error: "password must be of type string", required_error: "password required" })
    .min(1, "password required"),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string({ invalid_type_error: "email must be of type string", required_error: "email required" })
    .min(1, "email required")
    .email("Invalid email format"),
});
export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    email: z
      .string({ invalid_type_error: "email must be of type string", required_error: "email required" })
      .min(1, "email required")
      .email("Invalid email format"),
    otp: z
      .string({ invalid_type_error: "otp must be of type string", required_error: "otp required" })
      .min(1, "otp required"),
    password: z
      .string({ invalid_type_error: "password must be of type string", required_error: "password required" })
      .min(1, "password required")
      .regex(
        passwordRegex,
        "password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    confirm_password: z
      .string({
        invalid_type_error: "confirm password must be of type string",
        required_error: "confirm password required",
      })
      .min(1, "confirm password required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "password and confirm password must be same",
    path: ["confirm_password"],
  });
export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const checkResetPasswordLinkSchema = z.object({
  email: z
    .string({ invalid_type_error: "email must be of type string", required_error: "email required" })
    .min(1, "email required")
    .email("Invalid email format"),
  otp: z
    .string({ invalid_type_error: "otp must be of type string", required_error: "otp required" })
    .min(1, "otp required"),
});
export type checkResetPasswordLinkSchemaType = z.infer<typeof checkResetPasswordLinkSchema>;
