import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Loader({ className }) {
  return (
    <div className={cn("absolute top-0 bottom-0 left-0 right-0 inset-0 bg-white/80 backdrop-blur-sm z-50", className)}>
      <div className="flex items-center justify-center h-full gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-lg font-medium text-gray-900">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
          </span>
        </span>
      </div>
    </div>
  );
}
