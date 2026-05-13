import Link from "next/link";
import { Button } from "../../ui/button";
import { MessageCircle } from "lucide-react";

type CommentButtonProps = {
  blogId: string;
  commentCount: number;
};

export default function CommentButton(CommentProps: CommentButtonProps) {
  return (
    <Link href={`/blogs/${CommentProps.blogId}`}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Comment on blog"
        className="gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{CommentProps.commentCount}</span>
      </Button>
    </Link>
  );
}
