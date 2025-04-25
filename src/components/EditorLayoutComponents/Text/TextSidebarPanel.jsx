import { getData } from "@/utils/datas";

export default function TextSidebarPanel({
    mainStage,
    selectedIndex,
}) {
    const textTemplates = getData("textTemplates") || [];
    const textElements = getData("textElements") || [];
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 mb-4">
                <div className="text-sm font-semibold">Click or drag text to add to page</div>
                <div className="space-y-2">
                    {
                        textElements.map((element, index) => {
                            return (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={() => {
                                        mainStage[selectedIndex].dragRect.current = element.attrs;
                                    }}
                                    className="rounded-lg cursor-pointer w-full bg-primary hover:bg-violet-700 p-2">
                                    <p className={`text-[${element.size + "px"}] font-semibold pl-4`}>{element.title}</p>
                                </div>
                            )
                        })
                    }
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