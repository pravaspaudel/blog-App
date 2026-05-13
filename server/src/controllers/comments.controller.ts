import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/AppError";
import {
  DeleteCommentService,
  GetCommentsByBlogIdService,
  GetCommentsByCommentIdService,
  PostCommentService,
} from "../services/comments.service";
import { successResponse } from "../utils/response";

const GetComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogid;

    if (!blogId || Array.isArray(blogId)) {
      return next(new AppError("invalid blog id", 400));
    }

    const comments = await GetCommentsByBlogIdService(blogId);

    if (comments.length == 0) {
      return next(new AppError("no comments found", 404));
    }

    return successResponse(res, 200, "got comments successfully", comments);
  },
);

const PostComments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const blogId = req.params.blogid;
    const { comment } = req.body;

    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
    if (!blogId || Array.isArray(blogId)) {
      return next(new AppError("Invalid blog id", 400));
    }
    if (!comment || comment.trim().length === 0) {
      return next(new AppError("Cannot post an empty comment", 400));
    }
    const postedComment = await PostCommentService(blogId, user.id, comment);

    if (!postedComment) {
      return next(new AppError("Failed to post comment", 500));
    }
    return successResponse(
      res,
      201,
      "Comment posted successfully",
      postedComment,
    );
  },
);

//only the user who was wrote the comment can edit the comment
const DeleteComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
    const user = req.user!;

    if (!commentId || Array.isArray(commentId)) {
      return next(new AppError("invalid blog id", 400));
    }

    if (!blogId || Array.isArray(blogId)) {
      return next(new AppError("invalid blog id", 400));
    }

    const comment = await GetCommentsByCommentIdService(commentId);

    if (!comment) {
      return next(new AppError("no such blog exists", 400));
    }

    if (comment.blogId !== blogId) {
      return next(new AppError("comment doesnot belong to blogId", 400));
    }

    if (comment.userId !== user.id) {
      return next(new AppError("you can only delete your own comment", 403));
    }

    await DeleteCommentService(commentId);

    return successResponse(res, 200, "comment deleted successfully", comment);
  },
);

export { GetComments, PostComments, DeleteComment };
