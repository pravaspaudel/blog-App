import type { Response } from "express";
import type { SuccessResponse, ErrorResponse } from "../types/response";

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
) => {
  const body: SuccessResponse<T> = { success: true, message, data };
  return res.status(statusCode).json(body);
};

export const errorResponse = (
  res: Response,
  statusCode = 500,
  message = "something went wrong",
  errors?: Record<string, string[]>,
) => {
  const body: ErrorResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };

  return res.status(statusCode).json(body);
};
