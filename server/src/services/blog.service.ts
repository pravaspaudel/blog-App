import type { blogType } from "../types/blog.type";
import { blog } from "../db/schema";
import { db } from "../db/db.config";
import { eq } from "drizzle-orm";

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
  return newBlog[0];
};

const getBlogByIdService = async (id: string) => {
  const findBlog = await db.select().from(blog).where(eq(blog.id, id));
  return findBlog[0];
};

const getBlogsService = async () => {
  const blogs = await db.select().from(blog);
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
