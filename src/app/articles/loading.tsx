import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

export default function ArticlesLoading() {
  return (
    <>
      {/* Heading */}
      <section className="container py-16 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Skeleton shape="pill" className="mx-auto h-6 w-16" />
          <Skeleton className="mx-auto h-12 w-3/4" />
          <Skeleton className="mx-auto h-5 w-1/2" />
        </div>
        <div className="mx-auto mt-10 flex max-w-2xl gap-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-24" />
        </div>
      </section>

      {/* Grid */}
      <section className="container pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Skeleton shape="pill" className="h-11 w-72" />
        </div>
      </section>
    </>
  );
}
