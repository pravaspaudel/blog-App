import { Button } from "../ui/button";
import { Repeat } from "lucide-react";

type RepostProps = {
  blogId: string;
  repostCount: number;
};

export default function RepostComponent(repostProp: RepostProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Repost blog"
      className="gap-1"
    >
      <span>{repostProp.repostCount}</span>
      <Repeat className="h-5 w-5" />
    </Button>
  );
}
