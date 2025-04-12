import RightSideElements from "./TopToolbar/RightSideElements";
import DefaultTopToolbar from "./TopToolbar/DefaultTopToolbar";
import LeftSideElements from "./TopToolbar/LeftSideElements";
import CropTopToolbar from "./TopToolbar/CropTopToolbar";

export default function TopToolbar({ isCropping, handleCrop, handleCropEnd, selectedSubMenu, setSelectedSubMenu, selectedShape, setMainStage, mainStage, selectedIndex }) {
    return (
        <>
            {
                isCropping ? <CropTopToolbar isCropping={isCropping} handleCropEnd={handleCropEnd} /> : selectedShape && selectedShape.length !== 0 ? <div className="h-[49px] flex justify-between items-center px-3 py-[6px] bg-white border-y border-[#d0d0d0]">
                    <LeftSideElements handleCrop={handleCrop} selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
                    <RightSideElements selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} setSelectedSubMenu={setSelectedSubMenu} />
                </div> : <DefaultTopToolbar setSelectedSubMenu={setSelectedSubMenu} />
            }
        </>

    )
}
