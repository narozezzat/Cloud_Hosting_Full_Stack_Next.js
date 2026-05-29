"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import UserDropdown from "./UserDropdown";

interface HeaderAuthActionsProps {
  username: string | null;
}

/** Desktop auth area: the user menu when signed in, otherwise log in / sign up. */
export function HeaderAuthActions({ username }: HeaderAuthActionsProps) {
  if (username) return <UserDropdown username={username} />;

  return (
    <>
      <Button asChild variant="ghost" size="sm">
        <Link href="/login">Log in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/register">Get started</Link>
      </Button>
    </>
  );
}
