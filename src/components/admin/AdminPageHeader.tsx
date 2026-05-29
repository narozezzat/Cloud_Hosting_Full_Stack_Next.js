import * as React from "react";
import { Badge } from "@/components/ui/Badge";

interface AdminPageHeaderProps {
  title: string;
  badgeText?: string | number;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  badgeText,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="border-b border-border/50 pb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl truncate leading-none">
            {title}
          </h1>
          {badgeText !== undefined && badgeText !== null && badgeText !== "" && (
            <Badge variant="default" className="shrink-0 self-center -translate-y-0.5">
              {badgeText}
            </Badge>
          )}
        </div>
        {action && (
          <div className="flex shrink-0 items-center gap-3">
            {action}
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
