import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LikeButton from "./LikeComponent";
import { BlogResponse } from "@/types/blog.types";
import CommentComponent from "./CommentComponent";
import RepostComponent from "./RepostComponent";

export default function BlogComponent(blog: BlogResponse) {
  return (
    <Card className="w-full border-muted p-4">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm">
            @{blog.author.username}
          </CardDescription>
          <CardDescription>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </CardDescription>
        </div>

        <CardTitle className="line-clamp-2 text-2xl leading-tight">
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Link href={`/blogs/${blog.id}`}>
          <div className="relative h-60 w-full overflow-hidden rounded-2xl">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* show content */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground mt-3">
          {blog.content}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <LikeButton
          blogId={blog.id}
          likeCount={blog.stats.likesCount}
          initialLiked={blog.userInteraction.isLiked}
        />

        <CommentComponent
          blogId={blog.id}
          commentCount={blog.stats.commentsCount}
        />

        <RepostComponent
          blogId={blog.id}
          repostCount={blog.stats.repostsCount}
        />
      </CardFooter>
    </Card>
  );
}
