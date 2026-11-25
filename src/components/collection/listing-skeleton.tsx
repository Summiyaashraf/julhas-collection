import { Skeleton } from "@/components/ui/skeleton";

const PLACEHOLDER_KEYS = [
  "listing-skeleton-0",
  "listing-skeleton-1",
  "listing-skeleton-2",
  "listing-skeleton-3",
  "listing-skeleton-4",
  "listing-skeleton-5",
  "listing-skeleton-6",
  "listing-skeleton-7",
] as const;

export function ListingSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <div className="hidden space-y-6 lg:block" aria-hidden="true">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-28" />
        <Skeleton variant="text" className="w-16" />
        <Skeleton variant="rect" className="h-12 w-full" />
        <Skeleton variant="text" className="w-24" />
        <Skeleton variant="rect" className="h-24 w-full" />
      </div>
      <div>
        <div className="flex items-center justify-between gap-6 border-b border-stone-200 pb-5">
          <Skeleton variant="text" className="w-16" />
          <Skeleton variant="rect" className="h-12 w-52" />
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
          {PLACEHOLDER_KEYS.map((key) => (
            <li key={key}>
              <div className="space-y-3">
                <Skeleton variant="rect" className="aspect-[3/4] w-full" />
                <Skeleton variant="text" className="w-4/5" />
                <Skeleton variant="text" className="w-1/3" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
