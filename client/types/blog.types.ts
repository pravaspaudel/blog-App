import z from "zod";
import { blogSchema } from "@/lib/validations/blog";

export type BlogSchema = z.infer<typeof blogSchema>;

type author = {
  username: string;
};

type stats = {
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
};

type userinteraction = {
  isLiked: boolean;
};

export type BlogResponse = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  author: author;
  stats: stats;
  userInteraction: userinteraction;
};
