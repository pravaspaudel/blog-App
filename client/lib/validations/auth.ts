import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "name too short"),
  email: z.email("invalid email"),
  password: z.string().min(6, "password too short"),
});

export const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "password should be minium 6 characters long "),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
