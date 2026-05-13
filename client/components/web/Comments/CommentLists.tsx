import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cookies } from "next/headers";

type Comment = {
  commentId: string;
  content: string;
  createdAt: string;
  username: string;
  email: string;
};

type CommentResponse = {
  success: boolean;
  message: string;
  data: Comment[];
};

export default async function CommentLists({ blogId }: { blogId: string }) {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${blogId}/comments`,
    {
      cache: "no-store",

      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  if (!res.ok) {
    return <div className="text-sm text-red-500">No comments.</div>;
  }

  const comments: CommentResponse = await res.json();

  if (!comments?.data || comments.data?.length == 0) {
    return (
      <div className="text-sm text-muted-foreground">No comments yet.</div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.data.map((comment) => (
        <Card key={comment.commentId}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{comment.username}</p>

                <p className="text-xs text-muted-foreground">{comment.email}</p>
              </div>

              <p className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
