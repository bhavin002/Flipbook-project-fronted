import { getData } from "@/utils/datas";
import { Crown } from "lucide-react";
import { v4 as uuid } from "uuid";

export default function InteractionsSidebarPanel({ setIsEditorDrawerOpen, setMainStage, mainStage, selectedIndex }) {

    const elements = getData('interactions');
    const createDynamicDragMask = (element) => {
        const attrs = element.attrs;
        let dragMask = document.getElementById("all-other-drag-mask");

        // Handle specific drag masks for go-to-button-link based on src
        if (attrs.htmlType === "go-to-button-link") {
            if (attrs.src.includes("TikTok.svg")) {
                dragMask = document.getElementById("tiktok-social");
            } else if (attrs.src.includes("Pinterest.svg")) {
                dragMask = document.getElementById("pinterest-social");
            } else if (attrs.src.includes("Reddit.svg")) {
                dragMask = document.getElementById("reddit-social");
            } else if (attrs.src.includes("Spotify.svg")) {
                dragMask = document.getElementById("spotify-social");
            } else if (attrs.src.includes("Youtube.svg")) {
                dragMask = document.getElementById("youtube-social");
            } else if (attrs.src.includes("Instagram.svg")) {
                dragMask = document.getElementById("instagram-social");
            } else if (attrs.src.includes("Massenger.svg")) {
                dragMask = document.getElementById("messenger-social");
            } else if (attrs.src.includes("Facebook.svg")) {
                dragMask = document.getElementById("facebook-social");
            } else if (attrs.src.includes("LinkedIn.svg")) {
                dragMask = document.getElementById("linkedin-social");
            } else if (attrs.src.includes("Twitter.svg")) {
                dragMask = document.getElementById("twitter-social");
            } else if (attrs.src.includes("Snapchat.svg")) {
                dragMask = document.getElementById("snapchat-social");
            } else if (attrs.src.includes("Whatsapp.svg")) {
                dragMask = document.getElementById("whatsapp-social");
            } else if (attrs.src.includes("Cart.svg")) {
                dragMask = document.getElementById("cart-other");
            } else if (attrs.src.includes("Basket.svg")) {
                dragMask = document.getElementById("basket-other");
            } else if (attrs.src.includes("CreditCard.svg")) {
                dragMask = document.getElementById("credit-card-other");
            } else {
                dragMask = document.getElementById("go-to-button-link");
            }
        } else {
            // Use specific drag mask for other htmlTypes
            dragMask = document.getElementById(attrs.htmlType) || dragMask;
        }

        dragMask.style.opacity = attrs.opacity || "1"; // Use element opacity or default
        switch (attrs.htmlType) {
            case "link-area":
                dragMask.style.width = `80px`;
                dragMask.style.height = `16px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "go-to-button-link":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "contain";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            case "link-tag":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                dragMask.style.border = `10px solid ${attrs.fill || "#7bc2ff"}`;
                dragMask.style.borderRadius = "50%";
                dragMask.style.background = "transparent";
                break;
            case "square-caption":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "contain";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            case "embed-code":
                dragMask.style.width = `${100}px`;
                dragMask.style.height = `${100}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "20px 20px";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            case "popup-frame":
                dragMask.style.width = `100px`;
                dragMask.style.height = `100px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "spotlight":
                dragMask.style.width = `100px`;
                dragMask.style.height = `100px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "slideshow":
                dragMask.style.width = `150px`;
                dragMask.style.height = `100px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "20px 20px";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                break;
            case "photo-slideshow":
                dragMask.style.width = `100px`;
                dragMask.style.height = `100px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "video-embed":
                dragMask.style.width = `100px`;
                dragMask.style.height = `100px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "20px 20px";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                break;
            case "video-button":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "contain";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            case "audio-button":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "contain";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            case "shop-area":
                dragMask.style.width = `80px`;
                dragMask.style.height = `16px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "shop-button":
                dragMask.style.width = `150px`;
                dragMask.style.height = `50px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "20px 20px";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                break;
            case "product-tag":
                // Style the outer dragMask circle
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                dragMask.style.border = `4px solid ${attrs.fill || "#7bc2ff"}`;
                dragMask.style.borderRadius = "50%";
                dragMask.style.background = `transparent`;
                dragMask.style.display = "flex"; // Center inner div
                dragMask.style.alignItems = "center";
                dragMask.style.justifyContent = "center";

                // Create inner div for count
                const innerCircle = document.createElement("div");
                innerCircle.style.width = "30px"; // Smaller than outer circle
                innerCircle.style.height = "30px";
                innerCircle.style.borderRadius = "50%";
                innerCircle.style.background = `${attrs.fill || "#7bc2ff"}`;
                innerCircle.style.display = "flex";
                innerCircle.style.alignItems = "center";
                innerCircle.style.justifyContent = "center";

                dragMask.innerHTML = "";
                dragMask.appendChild(innerCircle);
                break;
            case "quiz":
                dragMask.style.width = `80px`;
                dragMask.style.height = `16px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "question":
                dragMask.style.width = `80px`;
                dragMask.style.height = `16px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "contact-form":
                dragMask.style.width = `80px`;
                dragMask.style.height = `16px`;
                dragMask.style.background = attrs.fill || "#7bc2ff";
                dragMask.style.opacity = attrs.opacity || "0.3";
                break;
            case "go-to-previous-page":
            case "go-to-next-page":
            case "go-to-page":
            case "go-to-first-page":
            case "go-to-last-page":
                dragMask.style.width = `${46}px`;
                dragMask.style.height = `${46}px`;
                if (attrs.src) {
                    dragMask.style.backgroundSize = "contain";
                    dragMask.style.backgroundRepeat = "no-repeat";
                    dragMask.style.backgroundPosition = "center";
                }
                dragMask.style.borderRadius = attrs.cornerRadius
                    ? `${attrs.cornerRadius}px`
                    : "0";
                break;
            default:
                dragMask.style.width = "100px";
                dragMask.style.height = "50px";
                dragMask.style.background = "#7bc2ff";
                dragMask.style.opacity = "0.3";
        }

        return dragMask;
    };
    return (
        <div className="px-6 pt-6 pb-2 space-y-4 flex flex-col h-[100vh]">
            <div className="h-0 overflow-y-auto flex-grow">
                <div className="space-y-4">
                    {elements.map((element, index) => (
                        <div key={index}>
                            <div className="mb-2 text-sm font-semibold">{element.title}</div>
                            <div className="grid grid-cols-3 gap-4">
                                {element.widget.map((item, itemIndex) => (
                                    <div key={itemIndex} className="cursor-pointer flex flex-col items-center"
                                        draggable
                                        onDragStart={(e) => {
                                            mainStage[selectedIndex].dragRect.current =
                                                item.attrs;
                                            const dragMask = createDynamicDragMask(item);
                                            e.dataTransfer.setDragImage(dragMask, 10, 10);
                                            const cleanup = () => {
                                                dragMask.innerHTML = "";
                                                dragMask.removeAttribute("style");
                                            };
                                            document.addEventListener("dragend", cleanup);
                                        }}
                                        onClick={() => {
                                            if (item.attrs) {
                                                // Get the group from the stage
                                                let group = mainStage[selectedIndex].stageref.current.children[0].children[1];

                                                // Calculate the center of the group
                                                const groupWidth = group.width();
                                                const groupHeight = group.height();
                                                const dropX = (groupWidth / 2) / group.scaleX() - (item.attrs.width || 50) / 2;
                                                const dropY = (groupHeight / 2) / group.scaleY() - (item.attrs.height || 50) / 2;

                                                // Create new shape at the center of the group
                                                let newShape = {
                                                    x: dropX,
                                                    y: dropY,
                                                    ...item.attrs,
                                                    id: uuid()
                                                };
                                                // Add the new shape at the center of the group
                                                setMainStage(prevState => {
                                                    const updatedState = [...prevState];
                                                    updatedState[selectedIndex] = {
                                                        ...updatedState[selectedIndex],
                                                        shapes: [...updatedState[selectedIndex].shapes, newShape]
                                                    };
                                                    return updatedState;
                                                });

                                                // Select the newly added shape
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

                                    >
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
                                        {element.isTextShow && (
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