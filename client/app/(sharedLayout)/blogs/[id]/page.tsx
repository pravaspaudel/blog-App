import { serverFetch } from "@/utils/serverFetch";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
};

type FetchedType = {
  success: boolean;
  message: string;
  data: Blog;
};

export default async function SinglePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  let blog: Blog | null = null;

  try {
    const fetched: FetchedType = await serverFetch(`/api/blogs/${id}`);
    blog = fetched.data;
  } catch (error) {
    console.log("FETCH ERROR:", error);
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold leading-tight">
            {blog.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Created at:{" "}
            {new Date(blog.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </CardHeader>

        <CardContent>
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {blog.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
