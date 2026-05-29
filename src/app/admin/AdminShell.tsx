"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminShellProps {
  username: string;
  children: React.ReactNode;
}

export default function AdminShell({ username, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const root = document.getElementById("app-scroll");
    const previous = root?.style.overflow;
    if (root) root.style.overflow = "hidden";
    return () => {
      if (root) root.style.overflow = previous ?? "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="z-40 hidden h-full w-20 shrink-0 border-r border-border bg-card md:block lg:w-64">
        <AdminSidebar username={username} />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar
          username={username}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col px-3 py-6 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-4 lg:px-8 lg:py-8 lg:pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
            {children}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[1100] md:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              tabIndex={-1}
              className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-72 max-w-[85vw] border-r border-border bg-card shadow-xl"
            >
              <AdminSidebar username={username} forceExpanded />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
