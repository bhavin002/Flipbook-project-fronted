const data = [
    {
        "_id": "6887b64419c10926a4ec323f",
        "workspaceId": "680fa8d9958409aaa1088f5b",
        "type": 0,
        "name": "Heading",
        "description": "George enjoys a healthy diet of fruits and grain.",
        "fontFamily": "Arial",
        "fontWeight": "normal",
        "fontSize": 80,
        "textColor": "#1f2937",
        "styles": [
            "underline"
        ],
        "textCase": "none",
        "alignment": "left",
        "textWrap": "wrap",
        "letterSpacing": 11,
        "lineHeight": 1.2,
        "isBoldDisabled": false,
        "isItalicDisabled": true,
        "__v": 14,
        "createdAt": "2025-07-28T17:41:24.369Z",
        "updatedAt": "2025-08-08T16:33:10.830Z"
    },
    {
        "_id": "6887b64419c10926a4ec3240",
        "workspaceId": "680fa8d9958409aaa1088f5b",
        "type": 1,
        "name": "Sub heading",
        "description": "There are three cats looking at me from the tree. I’m not sure what they want, but they look shady.",
        "fontFamily": "Georgia",
        "fontWeight": "normal",
        "fontSize": 40,
        "textColor": "#006aff",
        "styles": [
            "underline"
        ],
        "textCase": "capitalize",
        "alignment": "left",
        "textWrap": "wrap",
        "letterSpacing": 22,
        "lineHeight": 1.2,
        "isBoldDisabled": true,
        "isItalicDisabled": true,
        "__v": 3,
        "createdAt": "2025-07-28T17:41:24.369Z",
        "updatedAt": "2025-08-08T16:33:16.307Z"
    },
    {
        "_id": "6887b64419c10926a4ec3241",
        "workspaceId": "680fa8d9958409aaa1088f5b",
        "type": 2,
        "name": "Body text",
        "description": "Winter in New York is a very cold place, but it’s equally as beautiful. My best suggestion would be to find a nice pizza shop, order a nice warm slice of your favorite pizza, and watch the snow fall. You can also try hitting one of the amazing coffee shops in Times Square.",
        "fontFamily": "Courier New",
        "fontWeight": "normal",
        "fontSize": 23,
        "textColor": "#006aff",
        "styles": [
            "strikethrough",
            "underline"
        ],
        "textCase": "uppercase",
        "alignment": "right",
        "textWrap": "wrap",
        "letterSpacing": -1,
        "lineHeight": 1.2,
        "isBoldDisabled": false,
        "isItalicDisabled": true,
        "__v": 10,
        "createdAt": "2025-07-28T17:41:24.369Z",
        "updatedAt": "2025-08-08T16:33:51.241Z"
    },
    {
        "_id": "6887b64419c10926a4ec3242",
        "workspaceId": "680fa8d9958409aaa1088f5b",
        "type": 3,
        "name": "Pagination",
        "description": "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11",
        "fontFamily": "Verdana",
        "fontWeight": "bold",
        "fontSize": 22,
        "textColor": "#1f2937",
        "styles": [
            "bold",
            "strikethrough",
            "underline"
        ],
        "textCase": "uppercase",
        "alignment": "center",
        "textWrap": "wrap",
        "letterSpacing": 49,
        "lineHeight": 2.2,
        "isBoldDisabled": false,
        "isItalicDisabled": true,
        "__v": 10,
        "createdAt": "2025-07-28T17:41:24.369Z",
        "updatedAt": "2025-08-08T16:11:04.371Z"
    }
]
// Original React component (unchanged)
import { getData } from "@/utils/datas";
import { v4 as uuid } from "uuid";

export default function TextSidebarPanel({
    mainStage,
    setMainStage,
    selectedIndex,
    setIsEditorDrawerOpen
}) {
    const textTemplates = getData("textTemplates") || [];
    let textElements = getData("textElements") || [];
    textElements = textElements.map((element) => {
        const typeWiseData = data.find(e => e.type === element.type);
        return {
            ...element,
            attrs: {
                ...element.attrs,
                fill: typeWiseData?.textColor || element.attrs.fill,
                fontSize: typeWiseData?.fontSize || element.attrs.fontSize,
                text: typeWiseData?.description || element.attrs.text,
                align: typeWiseData?.alignment || element.attrs.align || "left",
                fontStyle: typeWiseData?.fontWeight || element.attrs.fontStyle || "normal",
                letterSpacing: typeWiseData?.letterSpacing || element.attrs.letterSpacing || 0,
                lineHeight: typeWiseData?.lineHeight || element.attrs.lineHeight || 1.2,
                textTransform: typeWiseData?.textCase || element.attrs.textTransform || "none",
                textDecoration:
                    typeWiseData?.styles?.includes("underline") && typeWiseData?.styles?.includes("strikethrough") ? "underline line-through" :
                        typeWiseData?.styles?.includes("strikethrough") && !typeWiseData?.styles?.includes("underline") ? "line-through" :
                            typeWiseData?.styles?.includes("underline") && !typeWiseData?.styles?.includes("strikethrough") ? "underline" :
                                typeWiseData?.styles?.includes("bold") ? "bold" : "none",
                visible: true,
                layer: "Text",
                // width: typeWiseData?.width || element.attrs.width || 300,
                fontFamily: typeWiseData?.fontFamily || element.attrs.fontFamily || 'Arial',
                // htmlType: typeWiseData?.htmlType || element.attrs.htmlType || "text"

            }
        }

    })
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="space-y-2 mb-4">
                <div className="text-sm font-semibold">Click or drag text to add to page</div>
                <div className="space-y-2">
                    {textElements.map((element, index) => {
                        return (
                            <div
                                key={index}
                                draggable
                                onDragStart={() => {
                                    mainStage[selectedIndex].dragRect.current = element.attrs;
                                }}
                                onClick={() => {
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
                                }}
                                className="rounded-lg cursor-pointer w-full bg-primary hover:bg-violet-700 p-2"
                            >
                                <p className={`text-[${element.size + "px"}] font-semibold pl-4`}>{element.title}</p>
                            </div>
                        );
                    })}
                </div>
                <a href="http://localhost:5173/branding/text-styles" target="_blank" className="text-sm flex justify-end font-medium text-white cursor-pointer hover:underline">Edit or add font styles</a>
            </div>
            <div className="text-sm font-semibold">Text templates</div>
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="grid grid-cols-2 gap-4">
                    {textTemplates.map((textTemplate) => (
                        <div className="relative cursor-pointer rounded-lg overflow-hidden" key={textTemplate.id}>
                            <div className={`relative aspect-[4/3]`}>
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
    );
}