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
