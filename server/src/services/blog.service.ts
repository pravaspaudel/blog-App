import type { blogType } from "../types/blog.type";
import { blog, blogDetailsCount, userTable } from "../db/schema";
import { db } from "../db/db.config";
import { eq, sql, desc } from "drizzle-orm";
import AppError from "../utils/AppError";

const createBlogService = async (
  b: blogType,
  userId: string,
  thumbnailUrl: string,
) => {
  const newBlog = await db
    .insert(blog)
    .values({
      ...b,
      thumbnail: thumbnailUrl,
      createdBy: userId,
    })
    .returning();

  //while creating a blog a empty row of its detail is stored
  if (!newBlog[0]) {
    throw new AppError("issue in creation of blog", 400);
  }

  await db.insert(blogDetailsCount).values({
    blogId: newBlog[0]?.id,
    likesCount: 0,
    commentsCount: 0,
    repostsCount: 0,
  });

  return newBlog[0];
};

const getBlogByIdService = async (id: string) => {
  const findBlog = await db.select().from(blog).where(eq(blog.id, id));
  return findBlog[0];
};

const getBlogsService = async () => {
  const blogs = await db
    .select({
      id: blog.id,
      title: blog.title,

      // content: blog.content,
      content: sql<string>`
      LEFT(${blog.content},180)`,

      thumbnail: blog.thumbnail,
      createdAt: blog.createdAt,
      author: {
        username: userTable.username,
        //will add the url of avatar later
      },
      stats: {
        likesCount: sql<number>`COALESCE(${blogDetailsCount.likesCount}, 0)`,
        commentsCount: sql<number>`COALESCE(${blogDetailsCount.commentsCount}, 0)`,
        repostsCount: sql<number>`COALESCE(${blogDetailsCount.repostsCount}, 0)`,
      },
      userInteraction: {
        isLiked: sql<boolean>` 
        EXISTS(
          SELECT 1 FROM blog_likes bl
          WHERE bl.blog_id = ${blog.id}
          AND bl.user_id = ${userTable.id}
        )`,
      },
    })
    .from(blog)
    .leftJoin(blogDetailsCount, eq(blog.id, blogDetailsCount.blogId))
    .leftJoin(userTable, eq(blog.createdBy, userTable.id))
    .orderBy(desc(blog.createdAt));
  return blogs;
};

const getBlogByCreatorService = async (id: string) => {
  //id is of the creator on here
  const resultBlogs = await db
    .select()
    .from(blog)
    .where(eq(blog.createdBy, id));

  return resultBlogs;
};

const updateBlogService = async (id: string, data: Partial<blogType>) => {
  const updated = await db
    .update(blog)
    .set(data)
    .where(eq(blog.id, id))
    .returning();

  return updated[0] ?? null;
};

const deleteBlogService = async (id: string) => {
  await db.delete(blog).where(eq(blog.id, id));
};

export {
  createBlogService,
  getBlogsService,
  getBlogByIdService,
  getBlogByCreatorService,
  updateBlogService,
  deleteBlogService,
};
