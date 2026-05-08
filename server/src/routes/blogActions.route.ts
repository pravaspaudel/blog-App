import { Router } from "express";
import { LikePost } from "../controllers/likes.controller";
import {
  GetComments,
  PostComments,
  DeleteComment,
} from "../controllers/comments.controller";
import { protectRoute } from "../middlewares/auth.middleware";

//routes for likes,comment,reposts
const blogActions = Router();

//for liking
blogActions.post("/blogs/:blogid/like", protectRoute, LikePost);

//for comments
blogActions.get("/blogs/:blogid/comments", protectRoute, GetComments);
blogActions.post("/blogs/:blogid/comments", protectRoute, PostComments);
blogActions.delete(
  "/blogs/:blogid/comments/:commentid",
  protectRoute,
  DeleteComment,
);

export default blogActions;
