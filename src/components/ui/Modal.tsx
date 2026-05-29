"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-2xl",
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  hideClose?: boolean;
  contentClassName?: string;
  /** "sheet" (default) — drawer on mobile, dialog on desktop. "center" — always dialog. */
  variant?: "sheet" | "center";
}

function HeaderContent({
  icon,
  title,
  description,
  layout,
}: {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  layout: "dialog" | "drawer";
}) {
  if (!title && !description && !icon) return null;
  return (
    <div className="flex items-start gap-3 pr-8">
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {title &&
          (layout === "dialog" ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <DrawerTitle>{title}</DrawerTitle>
          ))}
        {description &&
          (layout === "dialog" ? (
            <DialogDescription className="mt-1">{description}</DialogDescription>
          ) : (
            <DrawerDescription className="mt-1">{description}</DrawerDescription>
          ))}
      </div>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  hideClose = false,
  contentClassName,
  variant = "sheet",
}: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const useDrawer = variant === "sheet" && !isDesktop;

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  if (useDrawer) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange} dismissible={closeOnOverlayClick}>
        <DrawerContent className={contentClassName}>
          <DrawerHeader>
            <HeaderContent
              icon={icon}
              title={title}
              description={description}
              layout="drawer"
            />
          </DrawerHeader>
          <div className="overflow-y-auto px-6 pb-6 pt-1">{children}</div>
          {footer && <DrawerFooter>{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showClose={!hideClose}
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) e.preventDefault();
        }}
        className={cn("w-[calc(100%-2rem)]", sizeClasses[size], contentClassName)}
      >
        <DialogHeader>
          <HeaderContent
            icon={icon}
            title={title}
            description={description}
            layout="dialog"
          />
        </DialogHeader>
        <div className="overflow-y-auto px-6 pb-6 pt-1">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
