import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { ToogleLikeService } from "../services/likes.service";
import AppError from "../utils/AppError";

//toogle the likes
const LikePost = asyncHandler(async (req, res, next) => {
  const user = req.user!;
  const blogId = req.params.blogid;

  if (!blogId || Array.isArray(blogId)) {
    return next(new AppError("invalid blog id", 400));
  }

  const result = await ToogleLikeService(blogId, user.id);

  return successResponse(
    res,
    200,
    result.liked ? "blog liked successfully" : "blog unliked successfully",
    result,
  );
});
export { LikePost };
