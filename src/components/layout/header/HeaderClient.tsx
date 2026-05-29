"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { HeaderDesktopNav } from "./HeaderDesktopNav";
import { HeaderAuthActions } from "./HeaderAuthActions";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

interface HeaderClientProps {
  isAdmin: boolean;
  username: string | null;
}

export default function HeaderClient({ isAdmin, username }: HeaderClientProps) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const onAdmin = pathname.startsWith("/admin");

  React.useEffect(() => {
    const el = document.getElementById("app-scroll");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 8);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (onAdmin) return null;

  return (
    <header
      className={cn(
        "shrink-0 z-50 w-full border-b duration-enter transition-[background-color,border-color,box-shadow,backdrop-filter]",
        scrolled
          ? "glass shadow-sm"
          : "bg-background border-transparent shadow-none",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <HeaderDesktopNav pathname={pathname} isAdmin={isAdmin} />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <HeaderAuthActions username={username} />
          </div>

          <HeaderMobileMenu
            open={open}
            onOpenChange={setOpen}
            pathname={pathname}
            isAdmin={isAdmin}
            username={username}
          />
        </div>
      </div>
    </header>
  );
}
