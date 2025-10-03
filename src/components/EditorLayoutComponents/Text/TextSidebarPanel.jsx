import { GetWorkspaceFontsApi } from "@/service/font.service";
// import { GetAllTemplates } from "@/service/template.service";
import { getData } from "@/utils/datas";
// import { TemplateType, TextDragValue } from "@/utils/enum";
import { TextDragValue } from "@/utils/enum";
// import { TextElementsListSkeleton, TextTemplateSkeleton } from "@/utils/Skeleton";
import { TextElementsListSkeleton } from "@/utils/Skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

export default function TextSidebarPanel({
    mainStage,
    setMainStage,
    selectedIndex,
    setIsEditorDrawerOpen
}) {
    // const [templates, setTemplates] = useState([]);
    const [workspaceFonts, setWorkspaceFonts] = useState([]);
    // const [isTemplatesLoading, setIsTemplatesLoading] = useState(false);
    const [isFontsLoading, setIsFontsLoading] = useState(false);

    let textElements = getData("textElements") || [];

    // useEffect(() => {
    //     const getTextTemplates = async () => {
    //         try {
    //             setIsTemplatesLoading(true);
    //             const response = await GetAllTemplates(TemplateType.TEXT);
    //             setTemplates(response.data);
    //         } catch (error) {
    //             toast.error("Failed to fetch text templates", {
    //                 description: error.message || "Oops! Something went wrong.",
    //             });
    //         } finally {
    //             setIsTemplatesLoading(false);
    //         }
    //     }
    //     getTextTemplates();
    // }, []);

    useEffect(() => {
        const getWorkspaceFonts = async () => {
            try {
                setIsFontsLoading(true);
                const response = await GetWorkspaceFontsApi();
                setWorkspaceFonts(response.data)
            } catch (error) {
                toast.error("Failed to fetch workspace fonts", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsFontsLoading(false);
            }
        }
        getWorkspaceFonts();
    }, []);

    const createDynamicTextElements = () => {
        if (!workspaceFonts.length) return [];

        return textElements.map((element) => {
            const typeWiseData = workspaceFonts.find(font => font.type === element.type);
            return {
                ...element,
                attrs: {
                    ...element.attrs,
                    fill: typeWiseData?.textColor || element.attrs.fill,
                    fontSize: typeWiseData?.fontSize || element.attrs.fontSize,
                    text: TextDragValue[typeWiseData?.type] || element.attrs.text,
                    align: typeWiseData?.alignment || element.attrs.align || "left",
                    fontStyle: typeWiseData?.fontWeight || element.attrs.fontStyle || "normal",
                    letterSpacing: typeWiseData?.letterSpacing || element.attrs.letterSpacing || 0,
                    lineHeight: typeWiseData?.lineHeight || element.attrs.lineHeight || 1.2,
                    textTransform: typeWiseData?.textCase || element.attrs.textTransform || "none",
                    textDecoration: getTextDecoration(typeWiseData?.styles || []),
                    visible: true,
                    draggable: true,
                    layer: "Text",
                    fontFamily: typeWiseData?.fontFamily || element.attrs.fontFamily || 'Arial',
                }
            };
        });
    };

    const getTextDecoration = (styles) => {
        if (!styles || !Array.isArray(styles)) return "none";

        const hasUnderline = styles.includes("underline");
        const hasStrikethrough = styles.includes("strikethrough");

        if (hasUnderline && hasStrikethrough) {
            return "underline line-through";
        } else if (hasStrikethrough) {
            return "line-through";
        } else if (hasUnderline) {
            return "underline";
        // } else if (styles.includes("bold")) {
        //     return "bold";
        }
        return "";
    };

    const handleTextElementAction = (element) => {
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

    const dynamicTextElements = createDynamicTextElements();

    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 mb-4">
                <div className="text-sm font-semibold">Click or drag text to add to page</div>
                <div className="space-y-2">
                    {isFontsLoading ? (
                        <TextElementsListSkeleton />
                    ) : (
                        dynamicTextElements.map((element, index) => {
                            const matchingFont = workspaceFonts.find(font => font.type === element.type);
                            return (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={() => {
                                        mainStage[selectedIndex].dragRect.current = element.attrs;
                                    }}
                                    onClick={() => handleTextElementAction(element)}
                                    className="rounded-lg cursor-pointer w-full bg-primary hover:bg-violet-700 p-2"
                                >
                                    <p className={`text-[${element.size || matchingFont?.fontSize || 16}px] font-semibold pl-4`}>
                                        {matchingFont?.name || element.title}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
                <a
                    href="http://localhost:5173/branding/text-styles"
                    target="_blank"
                    className="text-sm flex justify-end font-medium text-white cursor-pointer hover:underline"
                >
                    Edit or add font styles
                </a>
            </div>

            {/* <div className="text-sm font-semibold">Text templates</div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {isTemplatesLoading ? (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TextTemplateSkeleton key={`template-skeleton-${index}`} />
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
            </div> */}
        </div>
    );
}