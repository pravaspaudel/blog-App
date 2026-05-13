import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { errorResponse } from "../utils/response";
import multer from "multer";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("entereed errorHandler");
  console.log(err);

  if (err instanceof multer.MulterError) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return errorResponse(
        res,
        400,
        "file size is too large it should be less than 5MB.",
      );
    }
  }

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
