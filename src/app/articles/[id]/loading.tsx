import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
} from "@/components/ui/Skeleton";

export default function SingleArticleLoading() {
  return (
    <div className="container py-12 space-y-10">
      <Skeleton className="h-4 w-32" />

      {/* Header */}
      <div className="space-y-5">
        <Skeleton shape="pill" className="h-6 w-20" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-14 w-2/3" />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4">
          <div className="flex items-center gap-2.5">
            <SkeletonAvatar size="sm" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:ml-auto">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Body */}
      <SkeletonText lines={6} className="text-lg" />

      {/* Share strip */}
      <Skeleton shape="card" className="h-20 w-full" />

      {/* Comments */}
      <div className="space-y-6 border-t border-border pt-10">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <Skeleton className="h-11 w-full" />
          <div className="mt-3 flex justify-end">
            <Skeleton shape="pill" className="h-10 w-32" />
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 shadow-xs"
          >
            <div className="mb-3 flex items-center gap-3">
              <SkeletonAvatar />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
            <SkeletonText lines={2} />
          </div>
        ))}
      </div>
    </div>
  );
}
