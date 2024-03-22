import { useRouter } from "next/navigation";
import { Badge, badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
  //   const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button className={cn(badgeVariants())} key={tag}>
          {tag}
        </button>
      ))}
    </div>
  );
}
