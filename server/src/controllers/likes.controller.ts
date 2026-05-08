import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import {
  ExistingLikeService,
  LikeBlogService,
  RemoveLikeService,
} from "../services/likes.service";
import AppError from "../utils/AppError";

//toogle the likes
const LikePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const blogId = req.params.blogid;

    if (!blogId || Array.isArray(blogId)) {
      return next(new AppError("invalid blog id", 400));
    }

    const existingLike = await ExistingLikeService(blogId, user.id);

    if (existingLike) {
      await RemoveLikeService(blogId, user.id);
      return successResponse(res, 200, "blog unliked successfulyy", null);
    }

    const liked = await LikeBlogService(blogId, user.id);
    return successResponse(res, 200, "post liked successfully", liked);
  },
);

export { LikePost };
