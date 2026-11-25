import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12"
    >
      <div>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-4 py-6 sm:gap-6">
            <Skeleton
              variant="rect"
              className="h-40 w-30 shrink-0"
            />
            <div className="flex-1 space-y-3">
              <Skeleton variant="text" className="w-3/5" />
              <Skeleton variant="text" className="w-1/4" />
              <Skeleton variant="rect" className="mt-6 h-11 w-36" />
            </div>
          </div>
        ))}
      </div>
      <div className="border border-stone-300 bg-stone-50 px-5 py-5">
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="rect" className="mt-5 h-12 w-full" />
        <Skeleton variant="text" className="mt-5 w-full" />
        <Skeleton variant="text" className="mt-2 w-2/3" />
        <Skeleton variant="rect" className="mt-6 h-14 w-full" />
      </div>
    </div>
  );
}
