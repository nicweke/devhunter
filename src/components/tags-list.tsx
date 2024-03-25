"use client";

import { useRouter } from "next/navigation";
import { Badge, badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
          className={cn(badgeVariants())}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
