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