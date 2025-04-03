import { getData } from "@/utils/datas";
import { Crown } from "lucide-react";

export default function InteractionsSidebarPanel() {

    const elements = getData('interactions');

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="space-y-4">
                    {elements.map((section, index) => (
                        <div key={index}>
                            <div className="mb-2 text-sm font-semibold">{section.title}</div>
                            <div className="grid grid-cols-3 gap-4">
                                {section.widget.map((item, itemIndex) => (
                                    <div key={itemIndex} className="cursor-pointer flex flex-col items-center">
                                        <div className="rounded-lg h-14 w-full bg-primary hover:bg-violet-700 flex justify-center items-center relative">
                                            {item.isUpgrade && (
                                                <div className="absolute top-1 right-1">
                                                    <Crown className="h-4 w-4 text-amber-400 shrink-0" />
                                                </div>
                                            )}
                                            <div className="w-10 h-8 relative flex justify-center items-center"
                                                dangerouslySetInnerHTML={{ __html: item.icon }}>
                                            </div>
                                        </div>
                                        {section.isTextShow && (
                                            <div className="text-center mt-2 text-xs">{item.text}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}