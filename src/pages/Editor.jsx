import { useOutletContext } from "react-router-dom";
import StageComponent from "../components/EditorLayoutComponents/StageComponent";
import { useEffect, useRef, useState } from "react";
import TopToolbar from "../components/EditorLayoutComponents/TopToolbar";

export default function Editor() {
    const { selectedIndex, selectedShape, setSelectedIndex, mainStage, setMainStage, isSidebarOpen } = useOutletContext();
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
            <TopToolbar selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
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
                                            <StageComponent isCropping={isCropping} stage={stage} parentRef={parentRef} mainStageString={mainStageString} setMainStageString={setMainStageString} rectProps={rectProps} setRectProps={setRectProps} scale={scale} isSelected={selectedIndex === index} setScale={setScale} selectedIndex={selectedIndex} index={index} mainStage={mainStage} setMainStage={setMainStage} setSelectedIndex={setSelectedIndex} selectedAlignType={selectedAlignType} setSelectedAlignType={setSelectedAlignType} isSidebarOpen={isSidebarOpen} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}