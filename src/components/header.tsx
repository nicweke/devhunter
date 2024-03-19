"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Header() {
  const session = useSession();
  return (
    <header>
      <div>
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign In</Button>
        )}
        {session.data?.user?.name}
        <ThemeToggle />
      </div>
    </header>
  );
}
