"use client";

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
import { Pencil, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";

export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card className="border-purple-800 border-4 shadow-lg">
      <CardHeader className="relative">
        <Button size="icon" className="absolute top-2 right-1">
          <Link href={`/edit-room/${room.id}`}>
            <Pencil />
          </Link>
        </Button>
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
      <CardFooter className="flex gap-2">
        <Button asChild variant="ghost">
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            {" "}
            <Button variant="destructive">
              <Trash2Icon className="w-4 h-4 mr-2" /> Remove Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  //delete room
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
