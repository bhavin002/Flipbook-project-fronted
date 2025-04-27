import { Loader2 } from "lucide-react";

export default function LoadingButton() {
    return <>
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading
        <span className="inline-flex">
            <span className="animate-dot-1">.</span>
            <span className="animate-dot-2">.</span>
            <span className="animate-dot-3">.</span>
        </span>
    </>
}