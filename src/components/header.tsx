"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogInIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-semibold" asChild>
        <Button variant={"link"}>
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* {session.data?.user?.name} */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    // <header className="bg-gray-50 py-4 container mx-auto dark:bg-gray-900">
    <header className="container mx-auto py-5 z-10 relative">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="text-lg font-semibold">DevHunter.</div>
        </Link>

        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Browse Rooms
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex justify-between items-center gap-x-3">
          {isLoggedIn && <AccountDropdown />}

          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="ghost">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
