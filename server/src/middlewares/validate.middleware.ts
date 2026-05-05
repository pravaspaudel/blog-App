import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
import type { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      return errorResponse(res, 422, "validation error!", errors);
    }

    req.body = parsed.data;
    next();
  };
};
