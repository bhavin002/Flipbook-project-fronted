import ShapeAction from "@/pages/widgetSidebar/ShapeAction"
import LinkArea from "../../../pages/widgetSidebar/LinkArea"
import Color from "../WidgetStyler/Color"
import Effect from "../WidgetStyler/Effect"
import ShapeStyle from "../WidgetStyler/ShapeStyle"
import Filter from "../WidgetStyler/Filter"
import Style from "../WidgetStyler/Style"
import Flip from "../WidgetStyler/Flip"

function renderComponent(selectedShape, selectedSubMenu, mainStage, setMainStage, selectedIndex) {
    if (selectedShape?.length && selectedSubMenu === 'link-area') {
        return (
            <LinkArea />
        )
    }
    if (selectedSubMenu === 'effect') {
        return (
            <Effect selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'color') {
        return (
            <Color />
        )
    }
    if(selectedSubMenu === 'shape-style'){
        return (
            <ShapeStyle />
        )
    }
    if(selectedSubMenu === 'shape-action'){
        return (
            <ShapeAction />
        )
    }
    if(selectedSubMenu === 'image-filter'){
        return (
            <Filter />
        )
    }
    if(selectedSubMenu === 'image-style'){
        return (
            <Style />
        )
    }
    if(selectedSubMenu === 'image-flip'){
        return (
            <Flip />
        )
    }
}

export default function ShapeEditorLayout({ selectedSubMenu, selectedShape, mainStage, setMainStage, selectedIndex }) {
    console.log("selectedSubMenu - selectedShape", selectedSubMenu, selectedShape)
    return (
        <div className={`absolute right-0 h-full dark-theme top-0 bg-sidebar z-[11] text-white transition-all`} style={{ width: (selectedSubMenu) ? '23rem' : "0px", position: "absolute", overflowX: 'hidden' }}>
            {renderComponent(selectedShape, selectedSubMenu, mainStage, setMainStage, selectedIndex)}
        </div>
    )

}