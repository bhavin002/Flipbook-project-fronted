import LinkArea from "../widgetSidebar/LinkArea"

function renderComponent(selectedShape, selectedSubMenu) {
    if (selectedShape?.length && selectedSubMenu === 'link-area') {
        return (
            <LinkArea />
        )
    }
}

export default function ShapeEditorLayout({ selectedSubMenu, selectedShape }) {
    console.log("selectedSubMenu - selectedShape", selectedSubMenu, selectedShape)
    return (
        <div className={`absolute right-0 h-full dark-theme top-0 bg-sidebar z-[11] text-white transition-all`} style={{ width: (selectedSubMenu) ? '23rem' : "0px", position: "absolute", overflowX: 'hidden' }}>
            {renderComponent(selectedShape, selectedSubMenu)}
        </div>
    )

}