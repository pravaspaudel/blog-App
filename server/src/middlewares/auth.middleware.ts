import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import { decodeToken } from "../services/token.service";

const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return next(new AppError("please login to continue", 401));
    }

    try {
      const decoded = decodeToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
      next();
    } catch (error) {
      next(error);
    }
  },
);

export { protectRoute };
