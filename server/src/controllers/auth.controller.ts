import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { sucessResponse } from "../utils/response";
import { createUser, getUserByEmail } from "../services/user.service";
import AppError from "../utils/AppError";
import { comparePassword } from "../services/password.service";
import {
  createTokenandsetCookie,
  deleteCookie,
} from "../services/token.service";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const findUser = await getUserByEmail(email);

    if (findUser.length != 0) {
      return next(new AppError("user already exists", 409));
    }
    const user = await createUser(username, email, password);

    if (!user || user.length == 0) {
      return next(new AppError("user creation failed", 409));
    }

    const newUser = user[0]!;

    const token = createTokenandsetCookie(res, {
      id: newUser.id,
      email: newUser.email,
    });

    return sucessResponse(res, 201, "user created successfully", user[0]);
  },
);

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const findUser = await getUserByEmail(email);

    if (!findUser.length) {
      return next(new AppError("user doesn't exists", 400));
    }

    const user = findUser[0];
    if (!user) {
      return next(new AppError("user doesn't exists", 400));
    }

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) {
      return next(new AppError("invalid credentials", 401));
    }

    const token = createTokenandsetCookie(res, {
      id: user.id,
      email: user.email,
    });

    const safeUser = {
      id: user.id,
      email: user.email,
    };

    return sucessResponse(res, 200, "login successful", safeUser);
  },
);

const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    deleteCookie(res);
    return sucessResponse(res, 200, "logout successfully", {});
  },
);

const authCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return sucessResponse(res, 200, "user verified successfully", req.user);
  },
);

export { registerUser, loginUser, logoutUser, authCheck };
