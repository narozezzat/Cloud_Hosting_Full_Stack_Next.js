"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronRight, LogOut, User } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDropdownProps {
  username: string;
  /**
   * Custom trigger, rendered via `asChild`. Defaults to a circular avatar
   * button (used in the desktop header). The mobile drawer passes a full-width
   * account row so we don't render a second avatar next to it.
   */
  trigger?: React.ReactNode;
  /** Content alignment relative to the trigger. */
  align?: "start" | "center" | "end";
  /** Preferred side to open on. */
  side?: "top" | "bottom" | "left" | "right";
}

const UserDropdown = ({
  username,
  trigger,
  align = "end",
  side,
}: UserDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch {
      toast.warning("Something went wrong");
    }
  };

  const initial = username?.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-sm transition-transform duration-hover hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Account menu for ${username}`}
          >
            {initial}
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className="w-72 overflow-hidden p-0"
      >
        {/* Header banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 to-accent-500 px-4 pb-5 pt-6 text-center text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold ring-2 ring-white/40 backdrop-blur-sm">
                {initial}
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-brand-500"
              />
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-white/70">
              Signed in as
            </p>
            <p className="mt-0.5 max-w-full truncate font-display text-lg font-semibold leading-tight">
              {username}
            </p>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-1.5">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500/10 text-brand-500">
                <User className="h-4 w-4" />
              </span>
              <span className="flex-1 font-medium">Profile</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            destructive
            onSelect={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <LogOut className="h-4 w-4" />
            </span>
            <span className="flex-1 font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
