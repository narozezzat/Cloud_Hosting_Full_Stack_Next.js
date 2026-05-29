import { Skeleton, SkeletonRow } from "@/components/ui/Skeleton";

export default function AdminCommentsTableLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-4 border-b border-border bg-secondary/40 px-5 py-3">
          <Skeleton className="h-3 flex-[2]" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-12 ml-auto" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonRow key={i} cols={3} />
        ))}
      </div>
    </div>
  );
}
