import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { errorResponse } from "../utils/response";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("entereed errorHandler");
  if (err instanceof AppError) {
    return errorResponse(
      res,
      err.statusCode,
      err.message ?? "something went wrong",
    );
  }

  return errorResponse(res, 500, "internal server error");
};

export default errorHandler;
