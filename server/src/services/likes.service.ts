import { db } from "../db/db.config";
import { and, eq } from "drizzle-orm";
import { blogComments, blogLikes } from "../db/schema";

const LikeBlogService = async (blogId: string, userId: string) => {
  const blog = await db
    .insert(blogLikes)
    .values({
      userId: userId,
      blogId: blogId,
    })
    .returning();
  return blog[0] ?? null;
};

//the blogs liked by a myself
const GetBlogILikedService = async (userId: string) => {
  const blogs = await db
    .select()
    .from(blogLikes)
    .where(eq(blogLikes.userId, userId));

  return blogs;
};

const ExistingLikeService = async (blogId: string, userId: string) => {
  const like = await db
    .select()
    .from(blogLikes)
    .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.userId, userId)));

  return like[0] ?? null;
};

const RemoveLikeService = async (blogId: string, userId: string) => {
  await db
    .delete(blogLikes)
    .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.userId, userId)));
};

//get the count of like for blogId
const GetLikeCounts = async (blogId: string) => {
  const likes = await db
    .select()
    .from(blogLikes)
    .where(eq(blogLikes.blogId, blogId));

  return likes.length;
};

export {
  LikeBlogService,
  GetBlogILikedService,
  ExistingLikeService,
  RemoveLikeService,
  GetLikeCounts,
};
