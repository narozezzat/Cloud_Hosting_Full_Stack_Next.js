import {
  Skeleton,
  SkeletonAvatar,
  SkeletonText,
} from "@/components/ui/Skeleton";

export default function SingleArticleLoading() {
  return (
    <>
      <section className="container max-w-3xl py-12">
        <Skeleton className="h-4 w-32" />
        <div className="mt-6 space-y-4">
          <Skeleton shape="pill" className="h-6 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-4/5" />
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </section>

      <article className="container max-w-3xl pb-20">
        <SkeletonText lines={6} className="text-lg" />

        <div className="mt-16 border-t border-border pt-10 space-y-6">
          <Skeleton className="h-7 w-40" />

          {/* Comment composer */}
          <div className="rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-11 w-full" />
            <div className="mt-3 flex justify-end">
              <Skeleton shape="pill" className="h-10 w-32" />
            </div>
          </div>

          {/* Comment items */}
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
      </article>
    </>
  );
}
