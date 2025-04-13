import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function CropTopToolbar({ handleCropEnd, isCropping }) {
    return (
        <div className="h-[49px] flex justify-between items-center px-3 py-[6px] bg-white border-y border-[#d0d0d0]">
            <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={handleCropEnd} disabled={!isCropping}>
                    <Check className="w-4 h-4" /> Done
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCropEnd} disabled={!isCropping}>
                    <X className="w-4 h-4" /> Cancel
                </Button>
            </div>
        </div >
    )
}
