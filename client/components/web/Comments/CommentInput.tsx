"use client";

import { useAuth } from "@/context/AuthContextProvider";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { SendHorizonal } from "lucide-react";
import fetchApi from "@/utils/fetchApi";
import { useRouter } from "next/navigation";

export default function CommentInput({ blogId }: { blogId: string }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    if (!comment.trim() || loading) return;

    try {
      setLoading(true);

      await fetchApi(`/api/blogs/${blogId}/comments`, "POST", {
        comment,
      });

      setComment("");
      router.refresh();
    } catch (error) {
      console.log("COMMENT ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-sm text-muted-foreground">
        Login to view and post comment
      </div>
    );
  }

  return (
    <div className="relative w-full space-y-2">
      {/* status indicator */}
      {loading && (
        <p className="text-xs text-muted-foreground animate-pulse">
          Posting your comment...
        </p>
      )}

      <span className="block text-sm text-muted-foreground">{user.email}</span>

      <Input
        placeholder="Write your thoughts..."
        className="pr-12 py-5 rounded-xl"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
      />

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-[72%] -translate-y-1/2"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <SendHorizonal className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
