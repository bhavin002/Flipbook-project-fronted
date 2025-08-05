import { GetAllTemplates } from "@/service/template.service";
import { getData } from "@/utils/datas";
import { TemplateType } from "@/utils/enum";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const TemplateSkeleton = () => (
    <div className="cursor-pointer rounded-lg border border-gray-200 overflow-hidden animate-pulse">
        <div className="w-full h-24 bg-gray-200"></div>
    </div>
);

export default function TextSidebarPanel({
    mainStage,
    setMainStage,
    selectedIndex,
    setIsEditorDrawerOpen
}) {
    const textElements = getData("textElements") || [];
    const [isLoading, setIsLoading] = useState(false);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const getTextTemplates = async () => {
            try {
                setIsLoading(true);
                const response = await GetAllTemplates(TemplateType.TEXT);
                setTemplates(response.data);
            } catch (error) {
                toast.error("Failed to fetch text templates", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        getTextTemplates();
    }, []);

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
    };

    const handleTextElementClick = (element) => {
        if (element.attrs) {
            let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

            const groupWidth = group.width();
            const groupHeight = group.height();
            const dropX = (groupWidth / 2) / group.scaleX() - (element.attrs.width || 50) / 2;
            const dropY = (groupHeight / 2) / group.scaleY() - (element.attrs.height || 50) / 2;

            let newShape = {
                x: dropX,
                y: dropY,
                ...element.attrs,
                id: uuid()
            };

            setMainStage(prevState => {
                const updatedState = [...prevState];
                updatedState[selectedIndex] = {
                    ...updatedState[selectedIndex],
                    shapes: [...updatedState[selectedIndex].shapes, newShape]
                };
                return updatedState;
            });

            setTimeout(() => {
                mainStage[selectedIndex].stageref.current.children[0].children[1].children.forEach((child) => {
                    if (child.attrs.id === newShape.id) {
                        setMainStage(prevState => {
                            const updatedState = [...prevState];
                            updatedState[selectedIndex] = {
                                ...updatedState[selectedIndex],
                                selectedShapes: [child]
                            };
                            return updatedState;
                        });
                    }
                });
            }, 100);
            setIsEditorDrawerOpen(false);
        }
    };

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 mb-4">
                <div className="text-sm font-semibold">Click or drag text to add to page</div>
                <div className="space-y-2">
                    {textElements.map((element, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={() => {
                                mainStage[selectedIndex].dragRect.current = element.attrs;
                            }}
                            onClick={() => handleTextElementClick(element)}
                            className="rounded-lg cursor-pointer w-full bg-primary hover:bg-violet-700 p-2"
                        >
                            <p className={`text-[${element.size + "px"}] font-semibold pl-4`}>
                                {element.title}
                            </p>
                        </div>
                    ))}
                </div>
                <a 
                    href={`${import.meta.env.VITE_APP_URL}/branding/text-styles`} 
                    target="_blank" 
                    className="text-sm flex justify-end font-medium text-white cursor-pointer hover:underline"
                >
                    Edit or add font styles
                </a>
            </div>
            
            <div className="text-sm font-semibold">Text templates</div>
            
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {isLoading ? (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TemplateSkeleton key={`skeleton-${index}`} />
                            ))}
                        </>
                    ) : (
                        templates.map((template) => (
                            <div
                                key={template._id}
                                className="cursor-pointer rounded-lg border overflow-hidden border-gray-200 hover:border-gray-300"
                                onClick={() => handleTemplateClick(template)}
                            >
                                <div className="relative">
                                    <img
                                        src={template.thumbnail}
                                        alt={`Template ${template._id}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}