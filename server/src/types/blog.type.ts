import { z } from "zod";
import type blogSchema from "../validators/blog.validate";

export type blogType = z.infer<typeof blogSchema>;
