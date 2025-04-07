import { Layer, Rect, Stage } from "react-konva";
import StageComponent from "./StageComponent";
import { useEffect, useRef, useState } from "react";

export default function Editor({isSidebarOpen}) {
    const [mainStage, setMainStage] = useState([{
        "stageref": null,
        "CANVAS_WIDTH": 1632,
        "CANVAS_HEIGHT": 1056,
        "shapes": [
            {
                "draggable": true,
                "x": 434.83008356546094,
                "y": 283.873247414282,
                "width": 160,
                "height": 26,
                "fill": "#7bc2ff",
                "opacity": 0.3,
                "type": "rect",
                "title": "link-tags",
                "visible": true,
                "layer": "Link",
                "htmlType": "go-to-url",
                "id": "c786ef1f-37e5-44b6-8a81-0c073efe036b",
                "name": "shape",
                "rotation": 0,
                "scaleX": 2.3635097493036152,
                "scaleY": 6.473258078064039,
                "skewX": 0,
                "skewY": 0
            }
        ],
        "selectedShapes": [],
        "background": "#fff",
        "dragRect": {
            "current": null
        },
        "dragImg": {
            "current": null
        }
    }]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const autoScroll = useRef([]);
    useEffect(() => {
        autoScroll.current[selectedIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }, [selectedIndex])
    const parentRef = useRef(null);
    const [rectProps, setRectProps] = useState({ x: 0, y: 0, size: 0, tempWidth: 0, tempHeight: 0 });
    const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
    const [mainStageString, setMainStageString] = useState("");
    const [isCropping, setIsCropping] = useState(false);
    const [selectedAlignType, setSelectedAlignType] = useState("");


    return (
        <div className="flex w-full flex-col h-full">
            <div className="flex w-full flex-grow">
                <div className="flex w-full flex-grow">
                    <div style={{ userSelect: 'none' }} className="flex flex-col overflow-y-auto relative flex-grow w-full overflow-auto" >
                        <div style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            transformOrigin: "0 0",
                            width: "100%",
                            height: "100%",
                        }} ref={parentRef}>
                            <div style={{ width: "100%", height: "100%" }} className="relative" >
                                {
                                    mainStage.map((stage, index) => {
                                        return (
                                            <div ref={(el) => (autoScroll.current[index] = el)} style={{}}>
                                                <StageComponent isCropping={isCropping} stage={stage} parentRef={parentRef} mainStageString={mainStageString} setMainStageString={setMainStageString} rectProps={rectProps} setRectProps={setRectProps} scale={scale} isSelected={selectedIndex === index} setScale={setScale} selectedIndex={selectedIndex} index={index} mainStage={mainStage} setMainStage={setMainStage} setSelectedIndex={setSelectedIndex} selectedAlignType={selectedAlignType} setSelectedAlignType={setSelectedAlignType} isSidebarOpen={isSidebarOpen}/>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}