import { GitHub } from "@/components/icons";
import { TagsList, splitTags } from "@/components/tags-list";
import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevHunterVideo } from "./video-player";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);
  if (!room) {
    return <div>No room of this ID found</div>;
  }

  //const tags = splitTags(room.tags);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg dark:border-gray-100 border-gray-800 border-4 bg-card text-card-foreground shadow-sm p-4">
          <DevHunterVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border-purple-800 border-4 bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items gap-2  text-sm"
              target="_blank"
              rel="noopener noreferer"
            >
              <GitHub className="h-6 w-6" />
              Open Project on Github
            </Link>
          )}
          <p className="text-muted-foreground">{room?.description}</p>

          <div className="flex gap-2 flex-wrap">
            <TagsList tags={splitTags(room.tags)} />
          </div>
        </div>
      </div>
    </div>
  );
}
