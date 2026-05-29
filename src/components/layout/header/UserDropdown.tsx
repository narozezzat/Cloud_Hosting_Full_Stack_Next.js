"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { LogOut, User } from "lucide-react";
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
}

const UserDropdown = ({ username }: UserDropdownProps) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-sm transition-transform duration-hover hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Account menu for ${username}`}
        >
          {username?.charAt(0).toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-0">
        {/* Header banner */}
        <div className="relative overflow-hidden rounded-t-xl bg-gradient-to-br from-brand-500 to-accent-500 px-4 pb-4 pt-5 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg font-bold ring-2 ring-white/30 backdrop-blur-sm">
              {username?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                Signed in as
              </p>
              <p className="truncate font-display text-base font-semibold">
                {username}
              </p>
            </div>
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
