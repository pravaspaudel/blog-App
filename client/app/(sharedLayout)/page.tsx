import { serverFetch } from "@/utils/serverFetch";
import { BookOpen } from "lucide-react";
import BlogComponent from "@/components/web/BlogComponent";
import { BlogResponse } from "@/types/blog.types";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default async function Home() {
  const fetched: ApiResponse<BlogResponse[]> = await serverFetch("/api/blogs");
  const blogs = fetched.data;

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground">
        <BookOpen className="h-12 w-12" />
        <p className="text-lg">No blogs available yet.</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl py-5 px-20">
      <section className="flex flex-col gap-6">
        {blogs.map((blog, idx) => (
          <BlogComponent
            key={idx}
            id={blog.id}
            title={blog.title}
            thumbnail={blog.thumbnail}
            content={blog.content}
            createdAt={blog.createdAt}
            author={blog.author}
            stats={blog.stats}
            userInteraction={blog.userInteraction}
          />
        ))}
      </section>
    </main>
  );
}
