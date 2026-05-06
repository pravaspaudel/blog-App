import { Router } from "express";
import {
  createBlog,
  getSingleBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getBlogByCreator,
} from "../controllers/blog.controller";
import { validate } from "../middlewares/validate.middleware";
import blogSchema from "../validators/blog.validate";
import { protectRoute } from "../middlewares/auth.middleware";

const blogRouter = Router();

blogRouter.get("/blogs", getBlogs);
blogRouter.get("/blogs/:id", getSingleBlog);
blogRouter.post("/blogs", protectRoute, validate(blogSchema), createBlog);
blogRouter.patch("/blogs/:id", protectRoute, validate(blogSchema), updateBlog);
blogRouter.delete("/blogs/:id", protectRoute, deleteBlog);

//blogs of a specific creator
blogRouter.get("/users/:id", getBlogByCreator);

export default blogRouter;
