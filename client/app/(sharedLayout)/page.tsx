import Link from "next/link";
import { serverFetch } from "@/utils/serverFetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookOpen } from "lucide-react";

type FetchedType = {
  data: Blog[];
};

type Blog = {
  id: string;
  title: string;
  content: string;
};

export default async function Home() {
  const fetched: FetchedType = await serverFetch("/api/blogs");
  const blogs: Blog[] = fetched.data;

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-3 text-muted-foreground">
        <BookOpen className="w-10 h-10" />
        <p className="text-lg">No blogs available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">All Blogs</h1>
        <p className="text-muted-foreground">
          {blogs.length} post{blogs.length !== 1 ? "s" : ""} published
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        {blogs.map((blog, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{blog.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {blog.content}
              </p>
            </CardContent>

            <CardFooter>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/blogs/${blog.id}`}>
                  Read more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
