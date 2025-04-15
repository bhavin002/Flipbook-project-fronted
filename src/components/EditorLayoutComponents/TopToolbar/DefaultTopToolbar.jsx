import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DefaultTopToolbar({ setIsShapeDrawerOpen, selectedSubMenu, setSelectedSubMenu }) {
    return (
        <div className="h-[49px] flex justify-between items-center px-3 py-[6px] bg-white border-y border-[#d0d0d0]">
            <div className="flex gap-2">
                <div className="border-r border-[#d0d0d0] pr-2">
                    <p className="text-sm">Page 1</p>
                    <p className="text-[10px] text-gray-500">1632 x 1056 px</p>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-xs">Background</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={() => {
                                        setIsShapeDrawerOpen(true)
                                        selectedSubMenu === "color" ? setSelectedSubMenu(null) : setSelectedSubMenu("color")
                                    }}
                                    className="w-8 h-8 rounded cursor-pointer border bg-white hover:bg-gray-50"
                                ></div>
                            </TooltipTrigger>
                            <TooltipContent align="center" className="bg-white text-gray-800 border border-gray-200 shadow-md max-w-xs px-2 py-1 rounded-md">
                                <p className="text-xs">Color</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div >
    )
}
