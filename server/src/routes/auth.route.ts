import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  authCheck,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { loginValidate, registerValidate } from "../validators/user.validate";
import { protectRoute } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", validate(registerValidate), registerUser);
authRouter.post("/login", validate(loginValidate), loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/check", protectRoute, authCheck);

export default authRouter;
