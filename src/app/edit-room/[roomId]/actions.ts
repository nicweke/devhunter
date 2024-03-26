"use server"

import { useToast } from "@/components/ui/use-toast";
import { editRoom, getRoom } from "@/data-access/rooms";
import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function editRoomAction(roomData: Omit<Room, "userId">) {

    const session = await getSession();

    if (!session) {
        throw new Error("you must be logged in to create this room");
    }

    const room = await getRoom(roomData.id);

    if (room?.userId !== session.user.id) {
        throw new Error("User not authorized");
    }

    await editRoom({ ...roomData, userId: room.userId });

    // toast({
    //     title: "Room Created",
    //     description: "Your room was successfully created",
    // });

    revalidatePath("/your-rooms");
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect("/your-rooms");

}