import * as z from "zod";
import type {
  loginValidate,
  registerValidate,
} from "../validators/user.validate";

export interface TokenType {
  id: string;
  email: string;
}

export type registerUserTYpe = z.infer<typeof registerValidate>;
export type loginUserType = z.infer<typeof loginValidate>;
