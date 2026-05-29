import { Skeleton, SkeletonStatCard } from "@/components/ui/Skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero skeleton — matches the gradient hero section */}
      <section className="rounded-2xl border border-border/60 bg-card p-5 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Skeleton shape="pill" className="h-6 w-24" />
            <Skeleton className="h-8 w-72 sm:h-10" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
          <Skeleton shape="pill" className="h-10 w-36 shrink-0" />
        </div>
      </section>

      {/* Stats skeleton — 2-col on mobile, 4-col on lg */}
      <section className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </section>

      {/* Quick links skeleton — 3 cards */}
      <section className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-md sm:p-5"
          >
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </section>

      {/* Bento skeleton — lg:grid-cols-5 (3 + 2 split) */}
      <section className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Recent activity */}
        <div className="rounded-xl bg-card p-5 shadow-md sm:p-6 lg:col-span-3 space-y-4">
          <div>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="mt-1.5 h-3.5 w-56" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton shape="circle" className="h-8 w-8 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top articles */}
        <div className="rounded-xl bg-card p-5 shadow-md sm:p-6 lg:col-span-2 space-y-4">
          <div>
            <Skeleton className="h-6 w-28" />
            <Skeleton className="mt-1.5 h-3.5 w-44" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 shrink-0 rounded" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
