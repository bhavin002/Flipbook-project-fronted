import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export const FolderSkeleton = () => {
  return (
    <div className="flex items-center py-1 px-3 animate-pulse">
      <div className="h-4 bg-violet-200/30 rounded w-48"></div>
      <div className="flex-1"></div>
    </div>
  );
};

export const SingleFileUploadSkeleton = () => {
  return (
    <div className="flex items-center justify-between animate-pulse">
      <div className="flex gap-2 items-center w-[80%]">
        <div className="w-[50px] h-[40px] bg-violet-200/30 rounded-sm" />
        <div className="h-4 bg-violet-200/30 rounded w-3/4" />
      </div>
      <div className="h-8 w-10 bg-violet-200/30 rounded-md" />
    </div>
  );
};

export function MediaFolderSkeleton() {
  const skeletons = Array(9).fill(null);

  return (
    <div className="grid grid-cols-3 gap-2">
      {skeletons.map((_, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <div className="rounded-lg w-full bg-violet-200/30 animate-pulse flex gap-2 px-1 py-1 items-center h-7">
          </div>
        </div>
      ))}
    </div>
  );
}

export function MediaImageSkeleton() {
  const skeletons = Array(9).fill(null);
  return (
    <div className="columns-3 gap-2 space-y-2 p-1">
      {skeletons.map((_, index) => (
        <div key={index} className="break-inside-avoid relative group">
          <div className="rounded-lg w-full bg-violet-200/30 animate-pulse h-[100px]"></div>
        </div>
      ))}
    </div>
  );
}

export function DetailsTabSkeleton() {
  return (
    <div className="py-6 max-w-[100vw] overflow-auto space-y-4">
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="flex gap-4 flex-wrap">
        <div className="lg:w-[40%] w-full space-y-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
        <Skeleton className="flex-grow h-96 rounded-lg" />
      </div>
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  )
}

export function FontCardSkeleton() {
  return (
    <div className="p-4 overflow-hidden mb-4 shadow-sm rounded-lg">
      <div className="h-4 bg-gray-200 rounded mb-2 w-24 animate-pulse"></div>
      <div className="p-0 mb-2">
        <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t pt-4">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-28 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}

export const TextTemplateSkeleton = () => (
  <div className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-24 bg-gray-200"></div>
  </div>
);

const TextElementSkeleton = () => (
    <div className="rounded-lg bg-gray-200 animate-pulse p-2 w-full">
        <div className="h-6 bg-gray-300 rounded pl-4"></div>
    </div>
);

export const TextElementsListSkeleton = () => (
    <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
            <TextElementSkeleton key={`text-element-skeleton-${index}`} />
        ))}
    </div>
);


export const PlanCardSkeleton = () => (
  <div className="border rounded-lg p-6 flex flex-col h-full animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-1 w-3/4"></div>
      <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded mb-1 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded mb-6"></div>
      <div className="space-y-3">
          {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded mt-0.5 flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
          ))}
      </div>
  </div>
);

export const TabContentSkeleton = () => (
  <div className="border rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-1 w-3/4"></div>
      <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded mb-1 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
      <div className="space-y-3">
          {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded mt-0.5 flex-shrink-0"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
          ))}
      </div>
  </div>
);