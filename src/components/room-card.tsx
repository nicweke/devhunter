import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { TagsList } from "@/components/tags-list";
import { GitHub } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { splitTags } from "@/lib/utils";
import Link from "next/link";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="border-purple-800 border-4 shadow-lg">
      <CardHeader>
        <h1 className="font-semibold text-lg">{room.name}</h1>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items gap-2 mb-5"
            target="_blank"
            rel="noopener noreferer"
          >
            <GitHub className="h-6 w-6" />
            Open Project on Github
          </Link>
        )}

        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
