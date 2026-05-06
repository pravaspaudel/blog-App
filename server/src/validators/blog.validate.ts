import { z } from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(5, "title should be at least 5 characters long")
    .max(50, "title should not exceed 50 characters"),
  content: z.string().min(15, "content should be at least 15 characters long"),
});

export default blogSchema;
