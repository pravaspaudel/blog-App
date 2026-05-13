import { db } from "../db/db.config";
import { and, eq, sql } from "drizzle-orm";
import { blogDetailsCount, blogLikes } from "../db/schema";

const ToogleLikeService = async (blogId: string, userId: string) => {
  return await db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(blogLikes)
      .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.userId, userId)));

    if (existing.length > 0) {
      await tx
        .delete(blogLikes)
        .where(and(eq(blogLikes.blogId, blogId), eq(blogLikes.userId, userId)));

      await tx
        .update(blogDetailsCount)
        .set({
          likesCount: sql`${blogDetailsCount.likesCount} - 1`,
        })
        .where(eq(blogDetailsCount.blogId, blogId));

      return { liked: false };
    }

    await tx.insert(blogLikes).values({
      blogId,
      userId,
    });

    await tx
      .update(blogDetailsCount)
      .set({
        likesCount: sql`${blogDetailsCount.likesCount} + 1`,
      })
      .where(eq(blogDetailsCount.blogId, blogId));

    return { liked: true };
  });
};

//the blogs liked by a myself
const GetBlogILikedService = async (userId: string) => {
  const blogs = await db
    .select()
    .from(blogLikes)
    .where(eq(blogLikes.userId, userId));

  return blogs;
};

//get the count of like for blogId
const GetLikeCounts = async (blogId: string) => {
  const likes = await db
    .select()
    .from(blogDetailsCount)
    .where(eq(blogDetailsCount.blogId, blogId));

  return likes.length;
};

export { GetBlogILikedService, ToogleLikeService, GetLikeCounts };
