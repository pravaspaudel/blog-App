import { db } from "../db/db.config";
import { eq } from "drizzle-orm";
import { blogComments } from "../db/schema";

const PostCommentService = async (
  blogId: string,
  userId: string,
  comment: string,
) => {
  const c = await db
    .insert(blogComments)
    .values({
      blogId: blogId,
      userId: userId,
      content: comment,
    })
    .returning();

  return c[0] ?? null;
};

const GetCommentsByBlogIdService = async (blogId: string) => {
  const comments = await db
    .select()
    .from(blogComments)
    .where(eq(blogComments.blogId, blogId));

  return comments;
};

const GetCommentsByCommentIdService = async (commentId: string) => {
  const comment = await db
    .select()
    .from(blogComments)
    .where(eq(blogComments.id, commentId));
  return comment[0] ?? null;
};

const DeleteCommentService = async (commentId: string) => {
  const deletedComment = await db
    .delete(blogComments)
    .where(eq(blogComments.id, commentId))
    .returning();
  return deletedComment;
};

export {
  PostCommentService,
  GetCommentsByBlogIdService,
  DeleteCommentService,
  GetCommentsByCommentIdService,
};
