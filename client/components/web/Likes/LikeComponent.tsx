"use client";

import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { useAuth } from "@/context/AuthContextProvider";
import { toast } from "sonner";

type LikeButtonProps = {
  blogId: string;
  likeCount: number;
  initialLiked: boolean;
};

export default function LikeButton(likebtn: LikeButtonProps) {
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(likebtn.initialLiked);
  const [count, setCount] = useState(likebtn.likeCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    if (!user) {
      toast.error("please authenticaate to like and comment on post");
      return;
    }

    setLoading(true);

    setIsLiked(!isLiked);
    setCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const result = await fetchApi(
        `/api/blogs/${likebtn.blogId}/like`,
        "POST",
      );
      console.log(result);
    } catch (err) {
      console.log(err);
      setIsLiked(isLiked);
      setCount(likebtn.likeCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Like blog"
      onClick={handleLike}
      className="gap-1"
    >
      <Heart
        className={`h-5 w-5 transition ${
          isLiked ? "fill-red-400 text-red-500" : ""
        }`}
      />

      <span className="text-sm">{count}</span>
    </Button>
  );
}
