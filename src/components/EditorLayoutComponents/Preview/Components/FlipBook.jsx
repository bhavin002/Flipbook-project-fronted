import "turn.js";
import Turn from "../Helper/Turn.jsx";
import React, { useEffect, useRef, useState } from "react";
import JsonToHtml from "../Helper/JsonToHtml.jsx";
import ClickToDynamic from "../Helper/ClickToDynamic.jsx";
import SlideShow from "../Widget/SlideShow.jsx";
import AudioButton from "../Widget/AudioButton.jsx";
import { GetFlipbookApi } from "@/service/flipbook.service.js";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader.jsx";

export default function FlipBook({ flipbookId }) {
    const [width, setWidth] = useState(793);
    const [height, setHeight] = useState(793);
    const [divWidth, setDivWidth] = useState(793);
    const [divHeight, setDivHeight] = useState(793);
    const [pageType, setPageType] = useState("double");
    const [pageContent, setPageContent] = useState([]);

    const myRef = useRef(null);

    const calculateNewDivSize = (screenWidth, screenHeight, divWidth, divHeight) => {
        pageType === "double" ? (divWidth *= 2) : (divWidth *= 1);
        const aspectRatio = divWidth / divHeight;
        const maxWidth = screenWidth * 0.9;
        const maxHeight = screenHeight * 0.8;
        let newWidth, newHeight;
        if (divWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
        } else {
            newWidth = divWidth;
            newHeight = divHeight;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }
        return {
            width: newWidth,
            height: newHeight,
        };
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            const previewDialog = document.getElementById("preview-dialog");
            if (previewDialog?.clientWidth < 768) {
                setPageType("single");
            }
            else {
                setPageType("double");
            }
            const ratioDta = calculateNewDivSize(previewDialog?.clientWidth, previewDialog?.clientHeight, divWidth, divHeight);
            setHeight(ratioDta.height);
            setWidth(ratioDta.width);
        });
        const previewDialog = document.getElementById("preview-dialog");

        if (previewDialog?.clientWidth < 768) {
            setPageType("single");
        }
        else {
            setPageType("double");
        }
        const ratioDta = calculateNewDivSize(previewDialog?.clientWidth, previewDialog?.clientHeight, divWidth, divHeight);
        setHeight(ratioDta.height);
        setWidth(ratioDta.width);
    }, [pageType, divWidth, divHeight]);

    useEffect(() => {
        const getPageData = async () => {
            try {
                setPageContent([]);
                const response = await GetFlipbookApi(flipbookId);
                setDivHeight(response.data.height);
                setDivWidth(response.data.width);
                const htmlData = JsonToHtml(response.data.pages);
                htmlData.map((data) => {
                    setPageContent((prev) => [...prev, data]);
                });
            } catch (error) {
                toast.error("Failed to load flipbook", {
                    description: error.message,
                });
            }
        }
        getPageData();
    }, [])

    if (pageContent.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center mt-10">
                <div className="flex flex-col items-center gap-4">
                    <Loader/>
                </div>
            </div>
        );
    }

    const handleShapeClick = (data) => {
        ClickToDynamic(data, myRef);
    }

    const handleBookLoad = () => {
        console.log("The book content is fully loaded!");
    };

    return (
        <>
            <div className="wrapper flex flex-col items-center justify-center">
                <div className="aspect" style={{ width: width, height: height }}>
                    <div className="aspect-inner">
                        <Turn className="flipbook" id="flipbook" width={width} height={height} pageType={pageType} myRef={myRef} onLoad={handleBookLoad}>
                            {pageContent.map((page, index) => (
                                <div key={index} className="page">
                                    <div style={{
                                        transformOrigin: "left top",
                                        transform: `scale(${width / (pageType === "double" ? divWidth * 2 : divWidth)}, ${height / divHeight})`,
                                        width: `${pageType === "double" ? divWidth : divWidth}px`,
                                        height: `${divHeight}px`,
                                        backgroundColor: "rgb(255, 255, 255)",
                                        position: "relative",
                                        overflow: "hidden",
                                    }} >
                                        {page.map((data, index) => {
                                            if (data?.shape?.htmlType === "slideshow") {
                                                return <SlideShow shape={data.shape} />;
                                            } else if (data?.shape?.htmlType === "audio-button") {
                                                return <AudioButton shape={data.shape} />
                                            } else {
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{ 'cursor': 'pointer' }}
                                                        title={`${data.shape?.htmlData?.tooltip}`}
                                                        onClick={() => handleShapeClick(data.shape)}
                                                        dangerouslySetInnerHTML={{ __html: data.html }}
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            ))}
                        </Turn>
                    </div>
                </div>
            </div>
        </>
    );
}
