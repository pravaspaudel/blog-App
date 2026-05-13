import { db } from "../db/db.config";
import { eq, sql } from "drizzle-orm";
import { blogComments, blogDetailsCount, userTable } from "../db/schema";

const PostCommentService = async (
  blogId: string,
  userId: string,
  comment: string,
) => {
  const cleanComment = comment.trim();

  const result = await db.transaction(async (tx) => {
    const inserted = await tx
      .insert(blogComments)
      .values({
        blogId,
        userId,
        content: cleanComment,
      })
      .returning({
        id: blogComments.id,
        content: blogComments.content,
        blogId: blogComments.blogId,
        userId: blogComments.userId,
        createdAt: blogComments.createdAt,
      });

    const newComment = inserted[0];

    await tx
      .insert(blogDetailsCount)
      .values({
        blogId,
        commentsCount: 1,
        likesCount: 0,
        repostsCount: 0,
      })
      .onConflictDoUpdate({
        target: blogDetailsCount.blogId,
        set: {
          commentsCount: sql`${blogDetailsCount.commentsCount} + 1`,
        },
      });

    return newComment;
  });

  return result ?? null;
};
const GetCommentsByBlogIdService = async (blogId: string) => {
  const comments = await db
    .select({
      commentId: blogComments.id,
      content: blogComments.content,
      createdAt: blogComments.createdAt,
      username: userTable.username,
      email: userTable.email,
    })
    .from(blogComments)
    .innerJoin(userTable, eq(blogComments.userId, userTable.id))
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
