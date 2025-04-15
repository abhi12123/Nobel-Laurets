import { Skeleton } from "~/components/ui/skeleton";

export default function CardsSkeleton() {
  return (
    <div className="w-full space-y-5">
      {/* Render 5 skeleton cards */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="w-full p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              {/* Title skeleton */}
              <Skeleton className="h-4 w-[250px]" />
              {/* Subtitle skeleton */}
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {/* Content skeleton lines */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
