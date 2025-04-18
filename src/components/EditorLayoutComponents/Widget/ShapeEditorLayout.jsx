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
import StockVideo from "../widgetSidebar/StockVideo"

function renderComponent(selectedShape, selectedSubMenu, mainStage, setMainStage, selectedIndex) {
    if (selectedShape?.length && selectedSubMenu === 'hyperlink') {
        return (
            <Hyperlink />
        )
    }
    if (selectedSubMenu === 'effect') {
        return (
            <Effect selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'color') {
        return (
            <Color selectedShape={selectedShape} mainStage={mainStage} setMainStage={setMainStage} selectedIndex={selectedIndex} />
        )
    }
    if (selectedSubMenu === 'shape-style') {
        return (
            <ShapeStyle />
        )
    }
    if (selectedSubMenu === 'shape-action') {
        return (
            <ShapeAction />
        )
    }
    if (selectedSubMenu === 'image-filter') {
        return (
            <ImageFilter selectedShape={selectedShape} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} />
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
            <Link />
        )
    }
    if (selectedSubMenu === "tag") {
        return (
            <Tag />
        )
    }
    if (selectedSubMenu === "caption") {
        return (
            <Caption />
        )
    }
    if (selectedSubMenu === "embed") {
        return (
            <Embed />
        )
    }
    if (selectedSubMenu === "slideshow") {
        return (
            <SlideShow />
        )
    }
    if (selectedSubMenu === "video-embed") {
        return (
            <VideoWidget />
        )
    }
    if (selectedSubMenu === "video-button") {
        return (
            <Video />
        )
    }
    if (selectedSubMenu === "audio-button") {
        return (
            <Audio />
        )
    }
    if (selectedSubMenu === "shopping-list") {
        return (
            <ShoppingList />
        )
    }
    if (selectedSubMenu === "product-tag") {
        return (
            <ProductTag />
        )
    }
    if (selectedSubMenu === "quiz") {
        return (
            <Quiz />
        )
    }
    if (selectedSubMenu === "question") {
        return (
            <Question />
        )
    }
    if (selectedSubMenu === "contact-form") {
        return (
            <ContactForm />
        )
    }
    if (selectedSubMenu === "page-options") {
        return (
            <PageOptions />
        )
    }
    if (selectedSubMenu === "go-to-page") {
        return (
            <GoToPage />
        )
    }
    if (selectedSubMenu === "stock-video") {
        return (
            <StockVideo />
        )
    }

}

export default function ShapeEditorLayout({ selectedSubMenu, selectedShape, mainStage, setMainStage, selectedIndex }) {
    return (
        <div className={`absolute right-0 h-full dark-theme top-0 bg-sidebar z-[11] text-white transition-all`} style={{ width: (selectedSubMenu) ? '23rem' : "0px", position: "absolute", overflowX: 'hidden' }}>
            {renderComponent(selectedShape, selectedSubMenu, mainStage, setMainStage, selectedIndex)}
        </div>
    )

}