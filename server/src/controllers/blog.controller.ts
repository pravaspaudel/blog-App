import type { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import {
  createBlogService,
  deleteBlogService,
  getBlogByCreatorService,
  getBlogByIdService,
  getBlogsService,
  updateBlogService,
} from "../services/blog.service";
import AppError from "../utils/AppError";

const createBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedBlog = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("user should loggged in", 401));
    }
    const newBlog = await createBlogService(parsedBlog, userId);
    return successResponse(res, 201, "blog created successfully", newBlog);
  },
);

const getBlogs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await getBlogsService();

    if (blogs.length == 0) {
      return next(new AppError("no blogs to show", 404));
    }
    return successResponse(res, 200, "got blogs sucessfully", blogs);
  },
);

const getSingleBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return next(new AppError("invalid blog id", 400));
    }
    const foundBlog = await getBlogByIdService(id);

    if (!foundBlog) {
      return next(new AppError("blog not found", 404));
    }
    return successResponse(res, 200, "blog fetched successfully", foundBlog);
  },
);

const updateBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const blogId = req.params.id;
    const updatedBody = req.body;

    if (!user) {
      return next(new AppError("user should be logged in", 401));
    }

    if (!blogId || Array.isArray(blogId)) {
      return next(new AppError("invalid id", 400));
    }

    const blog = await getBlogByIdService(blogId);

    if (!blog) {
      return next(new AppError("blog doesnot exists", 404));
    }

    if (blog.createdBy !== user.id) {
      return next(new AppError("only creator can update the blog", 403));
    }

    const updatedBlog = await updateBlogService(blogId, updatedBody);

    return successResponse(res, 200, "blog updated successfully", updatedBlog);
  },
);

const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return next(new AppError("user should be logged in", 401));
    }

    if (!id || Array.isArray(id)) {
      return next(new AppError("invalid id", 400));
    }

    const getBlog = await getBlogByIdService(id);

    if (!getBlog) {
      return next(new AppError("blog doesnot exists", 404));
    }

    if (getBlog.createdBy !== user.id) {
      return next(new AppError("only creator can delete the blog", 403));
    }

    await deleteBlogService(id);
    return successResponse(res, 200, "blog deleted successfully", {});
  },
);

//blogs written by myself
const getBlogByCreator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return next(new AppError("invalid input", 400));
    }

    const blogs = await getBlogByCreatorService(id);

    if (blogs.length == 0) {
      return next(new AppError("no blogs are found", 404));
    }

    return successResponse(res, 200, "got blogs of given creator", blogs);
  },
);

export {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogByCreator,
};
