import * as z from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "title should be at lest 3 characters long")
    .max(50, "title should not exceed 50 characters"),
  content: z.string().min(15, "content should be at least 15 characters long"),
});

export type BlogSchema = z.infer<typeof blogSchema>;
