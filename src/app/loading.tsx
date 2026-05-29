import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container py-20">
      {/* Hero skeleton */}
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <Skeleton shape="pill" className="h-6 w-44" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-5/6" />
          <SkeletonText lines={2} className="max-w-md" />
          <div className="flex gap-3 pt-2">
            <Skeleton shape="pill" className="h-12 w-36" />
            <Skeleton shape="pill" className="h-12 w-32" />
          </div>
        </div>
        <Skeleton shape="card" className="aspect-[5/4] w-full" />
      </div>

      {/* Plans skeleton */}
      <div className="mt-24 grid gap-6 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
