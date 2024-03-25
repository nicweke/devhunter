import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon, SearchIcon } from "lucide-react";
import { getRooms } from "@/data-access/rooms";
import { TagsList } from "@/components/tags-list";
import { GitHub } from "@/components/icons";
import { SearchBar } from "@/components/search-bar";
import { splitTags } from "@/lib/utils";

function RoomCard({ room }: { room: Room }) {
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

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl">Find Developer Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
