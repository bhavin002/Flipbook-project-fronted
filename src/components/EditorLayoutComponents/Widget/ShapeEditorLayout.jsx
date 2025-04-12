import ShapeAction from "@/pages/widgetSidebar/ShapeAction"
import LinkArea from "../../../pages/widgetSidebar/LinkArea"
import Color from "../WidgetStyler/Color"
import Effect from "../WidgetStyler/Effect"
import ShapeStyle from "../WidgetStyler/ShapeStyle"
import ImageFilter from "../WidgetStyler/ImageFilter"
import ImageStyle from "../WidgetStyler/ImageStyle"
import ImageAction from "@/pages/widgetSidebar/ImageAction"

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
            <ImageFilter />
        )
    }
    if(selectedSubMenu === 'image-style'){
        return (
            <ImageStyle />
        )
    }
    if(selectedSubMenu === 'image-action'){
        return (
            <ImageAction />
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