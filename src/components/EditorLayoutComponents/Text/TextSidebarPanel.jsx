import { getData } from "@/utils/datas";
import { Hash } from "lucide-react";

export default function TextSidebarPanel() {
    const textTemplates = getData("textTemplates") || [];
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 mb-4">
                <div className="text-sm font-semibold">Click or drag text to add to page</div>
                <div className="space-y-2">
                    <div className="rounded-lg w-full bg-primary p-2">
                        <p className="text-[42px] font-semibold pl-4">Add heading</p>
                    </div>
                    <div className="rounded-lg w-full bg-primary p-2">
                        <p className="text-[24px] pl-4">Add sub heading</p>
                    </div>
                    <div className="rounded-lg w-full bg-primary p-2">
                        <p className="text-[16px] pl-4">Add body text</p>
                    </div>
                    <div className="rounded-lg w-full bg-primary flex items-center gap-2 p-2 pl-4">
                        <Hash /> <p className="text-[14px] font-semibold">Pagination</p>
                    </div>
                </div>
                <a href="http://localhost:5173/branding/text-styles" target="_blank" className="text-sm flex justify-end font-medium text-white cursor-pointer hover:underline">Edit or add font styles</a>
            </div>
            <div className="text-sm font-semibold">Text templates</div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {textTemplates.map((textTemplate) => (
                        <div
                            className="relative cursor-pointer rounded-lg overflow-hidden"
                        >
                            <div className="relative aspect-[4/3]">
                                <img
                                    src={textTemplate.thumbnail}
                                    alt={`TextTemplate ${textTemplate.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}