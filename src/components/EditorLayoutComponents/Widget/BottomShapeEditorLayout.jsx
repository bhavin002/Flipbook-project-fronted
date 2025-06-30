import ShapeAction from "@/components/EditorLayoutComponents/widgetSidebar/ShapeAction"
import Color from "../WidgetStyler/Color"
import Effect from "../WidgetStyler/Effect"
import ShapeStyle from "../WidgetStyler/ShapeStyle"
import ImageFilter from "../WidgetStyler/ImageFilter"
import ImageStyle from "../WidgetStyler/ImageStyle"
import ImageAction from "@/components/EditorLayoutComponents/widgetSidebar/ImageAction"
import Hyperlink from "../widgetSidebar/Hyperlink"
import Link from "../widgetSidebar/Link"
import Tag from "../widgetSidebar/Tag"
import Caption from "../widgetSidebar/Caption"
import Embed from "../widgetSidebar/Embed"
import SlideShow from "../widgetSidebar/SlideShow"
import VideoWidget from "../widgetSidebar/VideoWidget"
import Video from "../widgetSidebar/Video"
import Audio from "../widgetSidebar/Audio"
import ShoppingList from "../widgetSidebar/ShoppingList"
import ProductTag from "../widgetSidebar/ProductTag"
import Quiz from "../widgetSidebar/Quiz"
import Question from "../widgetSidebar/Question"
import ContactForm from "../widgetSidebar/ContactForm"
import PageOptions from "../widgetSidebar/PageOptions"
import GoToPage from "../widgetSidebar/GoToPage"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import StockVideo from "../widgetSidebar/StockVideo"
import Text from "../widgetSidebar/Text"

function renderComponent(selectedShape, selectedSubMenu, setSelectedSubMenu, mainStage, setMainStage, selectedIndex, setIsShapeDrawerOpen, flipbookId) {
    if (selectedShape?.length && selectedSubMenu === 'hyperlink') {
        return (
            <Hyperlink mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'effect') {
        return (
            <Effect selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'color') {
        return (
            <Color setIsShapeDrawerOpen={setIsShapeDrawerOpen} setSelectedSubMenu={setSelectedSubMenu} selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'shape-style') {
        return (
            <ShapeStyle />
        )
    }
    if (selectedSubMenu === 'shape-action') {
        return (
            <ImageAction />
        )
    }
    if (selectedSubMenu === 'image-filter') {
        return (
            <ImageFilter setIsShapeDrawerOpen={setIsShapeDrawerOpen} setSelectedSubMenu={setSelectedSubMenu} selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'image-style') {
        return (
            <ImageStyle selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'image-action') {
        return (
            <ImageAction />
        )
    }
    if (selectedSubMenu === 'link') {
        return (
            <Link mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "tag") {
        return (
            <Tag mainStage={mainStage} setMainStage={setMainStage} selectedShape={selectedShape} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "caption") {
        return (
            <Caption selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === "embed") {
        return (
            <Embed selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "slideshow") {
        return (
            <SlideShow selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === "video-embed") {
        return (
            <VideoWidget selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "video-button") {
        return (
            <Video selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "audio-button") {
        return (
            <Audio selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "shopping-list") {
        return (
            <ShoppingList selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} flipbookId={flipbookId} />
        )
    }
    if (selectedSubMenu === "product-tag") {
        return (
            <ProductTag selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "quiz") {
        return (
            <Quiz selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} flipbookId={flipbookId}/>
        )
    }
    if (selectedSubMenu === "question") {
        return (
            <Question selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} flipbookId={flipbookId} />
        )
    }
    if (selectedSubMenu === "contact-form") {
        return (
            <ContactForm selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "page-options") {
        return (
            <PageOptions selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === "go-to-page") {
        return (
            <GoToPage selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex}/>
        )
    }
    if (selectedSubMenu === "stock-video") {
        return (
            <StockVideo />
        )
    }
    if (selectedSubMenu === "text") {
        return (
            <Text selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }

}

export default function BottomShapeEditorLayout({ isShapeDrawerOpen, setIsShapeDrawerOpen, selectedSubMenu, selectedShape, mainStage, setMainStage, selectedIndex, setSelectedSubMenu, flipbookId }) {
    return (
        <Drawer open={isShapeDrawerOpen} onOpenChange={() => {
            setIsShapeDrawerOpen(false)
            setSelectedSubMenu(null)
        }}>
            <DrawerContent className="max-h-[85vh] rounded-t-xl flex flex-col">
                {renderComponent(selectedShape, selectedSubMenu, setSelectedSubMenu, mainStage, setMainStage, selectedIndex, setIsShapeDrawerOpen, flipbookId)}
            </DrawerContent>
        </Drawer>
    )
}