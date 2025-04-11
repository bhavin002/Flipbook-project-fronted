import LinkArea from "../../../pages/widgetSidebar/LinkArea"
import Effect from "../WidgetStyler/Effect"

function renderComponent(selectedShape, selectedSubMenu, mainStage, setMainStage, selectedIndex) {
    if (selectedShape?.length && selectedSubMenu === 'link-area') {
        return (
            <LinkArea />
        )
    }
    if (selectedSubMenu === 'Effect') {
        return (
            <Effect selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
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