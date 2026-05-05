import * as z from "zod";

export const loginValidate = z.object({
  email: z.email(),
  password: z.string().min(5),
});

export const registerValidate = loginValidate.extend({
  username: z.string(),
});
