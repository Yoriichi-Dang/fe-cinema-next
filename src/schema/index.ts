import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" })
    .refine((value) => value.endsWith("@gmail.com"), {
      message: "Email end with @gmail.com only",
    }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password compulsory at least 8 characters" }),
});

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" })
      .refine((value) => value.endsWith("@gmail.com"), {
        message: "Email end with @gmail.com only",
      }),
    fullName: z
      .string()
      .trim()
      .min(1, { message: "Full name is required" })
      .max(50, { message: "Full name is too long" })
      .regex(/^[a-zA-Z]+$/, {
        message: "Full name must contain only alphabetic characters",
      }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password compulsory at least 8 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Password compulsory at least 8 characters" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
