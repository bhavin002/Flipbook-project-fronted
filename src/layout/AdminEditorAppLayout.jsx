import { useEffect, useState } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import PublishFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/utils/AppSidebar";
import EditorSidebarNavigation from "@/components/EditorLayoutComponents/EditorSidebarNavigation";
import BottomEditorPanel from "@/components/EditorLayoutComponents/BottomEditorPanel";
import ShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/ShapeEditorLayout";
import BottomShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/BottomShapeEditorLayout";
import { toast } from "sonner";
import useWindowWidth from "@/hooks/use-window-width";
import PreviewDialog from "@/components/EditorLayoutComponents/Preview/PreviewDialog";
import { EditTemplateApi, GetTemplateApi } from "@/service/template.service";
import LoadingButton from "@/utils/LoadingButton";

export default function AdminEditorAppLayout({ isSidebarOpen, setIsSidebarOpen }) {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedShape, setSelectedShape] = useState([]);
    const [currentView, setCurrentView] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [stageWidth, setStageWidth] = useState(0);
    const [stageHeight, setStageHeight] = useState(0);
    const windowInnerWidth = useWindowWidth();
    const { id } = useParams();
    const [mainStage, setMainStage] = useState([]);
    const navigate = useNavigate();

    console.log("mainStage ??", mainStage, stageWidth, stageHeight)

    useEffect(() => {
        const getFlipbook = async () => {
            try {
                const response = await GetTemplateApi(id);
                setStageWidth(response.data.width);
                setStageHeight(response.data.height);
                const validPageData = response.data.pages;
                setMainStage(validPageData.map(e => JSON.parse(e.pageData)));
            } catch (error) {
                toast.error(error?.message || "Error fetching page data");
            }
        };
        if (id) {
            getFlipbook();
        }
    }, [id])

    const cloneStageElements = (stageRef) => {
        const targetChild = stageRef.children[0].children[1];
        const bg = stageRef.children[0].children[0];
        const targetWidth = targetChild.width() / targetChild.scaleX();
        const targetHeight = targetChild.height() / targetChild.scaleY();

        // Clone target child and background
        const clonedNode = targetChild.clone();
        const clonedBg = bg.clone();

        // Reset attributes
        clonedNode.setAttr('scaleX', 1);
        clonedNode.setAttr('scaleY', 1);
        clonedNode.setAttr('x', 0);
        clonedNode.setAttr('y', 0);

        clonedBg.setAttr('height', targetHeight);
        clonedBg.setAttr('width', targetWidth);
        clonedBg.setAttr('x', 0);
        clonedBg.setAttr('y', 0);

        clonedNode.children = [clonedBg, ...clonedNode.children];

        return { clonedNode, targetWidth, targetHeight };
    };

    const saveTemplate = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();

            mainStage.map(page => {
                page.shapes = page.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
                page.selectedShapes = [];
                formData.append('pages', JSON.stringify({
                    ...page,
                    stageref: null
                }));
            });

            const imagePromises = mainStage.map(async (stage, index) => {
                const stageRef = stage.stageref.current;
                const { clonedNode, targetWidth, targetHeight } = cloneStageElements(stageRef);
                const clippedImage = await clonedNode.toDataURL({
                    x: 0,
                    y: 0,
                    width: targetWidth,
                    crossOriginIsolated: false,
                    height: targetHeight,
                    pixelRatio: 1,
                    mimeType: 'image/png',
                });
                console.log("clippedImage ??", clippedImage)
                const blob = await (await fetch(clippedImage)).blob();
                console.log("blob ??", blob)
                formData.append("thumbnails", blob, `image_${index}.jpg`);
            });

            // Wait for all images to be processed and added to FormData
            await Promise.all(imagePromises);

            formData.append('width', stageWidth);
            formData.append('height', stageHeight);

            const response = await EditTemplateApi(id, formData);
            toast.success("Template saved successfully", {
                description: response.data.message
            });
        } catch (error) {
            toast.error(error?.message || "Error saving template");
        } finally {
            setIsLoading(false);
        }

    }

    const [selectedSubMenu, setSelectedSubMenu] = useState(null);
    const [isShapeDrawerOpen, setIsShapeDrawerOpen] = useState(false);
    const [isEditorDrawerOpen, setIsEditorDrawerOpen] = useState(false);

    return (
        <>
            {/* Default drag mask for fallback cases */}
            <div
                id="all-other-drag-mask"
                className="absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-black opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Links and Tags */}
            <div
                id="go-to-button-link"
                className="drag-mask bg-[url(/src/assets/icons/Link.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="square-caption"
                className="drag-mask bg-[url(/src/assets/icons/Plus.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="embed-code"
                className="drag-mask bg-[url(/src/assets/icons/Code.svg)] bg-[#ebf0fc] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="link-area"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="link-tag"
                className="drag-mask bg-transparent absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="popup-frame"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Image */}
            <div
                id="spotlight"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="slideshow"
                className="drag-mask bg-[url(/src/assets/icons/SlideShow.svg)] bg-[#ebf0fc] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="photo-slideshow"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Audio & Video */}
            <div
                id="video-embed"
                className="drag-mask bg-[url(/src/assets/icons/Play.svg)] bg-[#000000] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="video-button"
                className="drag-mask bg-[url(/src/assets/icons/VideoButton.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="audio-button"
                className="drag-mask bg-[url(/src/assets/icons/AudioButton.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Shop */}
            <div
                id="shop-area"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="shop-button"
                className="drag-mask bg-[url(/src/assets/icons/ShopButton.svg)] bg-[#000000] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="product-tag"
                className="drag-mask bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Engagement */}
            <div
                id="quiz"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="question"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="contact-form"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Navigation */}
            <div
                id="go-to-previous-page"
                className="drag-mask bg-[url(/src/assets/icons/PrevPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-next-page"
                className="drag-mask bg-[url(/src/assets/icons/NextPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-page"
                className="drag-mask bg-[url(/src/assets/icons/GoToPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-first-page"
                className="drag-mask bg-[url(/src/assets/icons/GoToFirstPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-last-page"
                className="drag-mask bg-[url(/src/assets/icons/GoToFirstPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Social (reusing go-to-button-link for most, but adding specific ones for clarity) */}
            <div
                id="tiktok-social"
                className="drag-mask bg-[url(/src/assets/icons/social/TikTok.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="pinterest-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Pinterest.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="reddit-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Reddit.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="spotify-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Spotify.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="youtube-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Youtube.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="instagram-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Instagram.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="messenger-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Massenger.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="facebook-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Facebook.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="linkedin-social"
                className="drag-mask bg-[url(/src/assets/icons/social/LinkedIn.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="twitter-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Twitter.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="snapchat-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Snapchat.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="whatsapp-social"
                className="drag-mask bg-[url(/src/assets/icons/social/Whatsapp.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Other */}
            <div
                id="cart-other"
                className="drag-mask bg-[url(/src/assets/icons/Cart.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="basket-other"
                className="drag-mask bg-[url(/src/assets/icons/Basket.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="credit-card-other"
                className="drag-mask bg-[url(/src/assets/icons/CreditCard.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>

            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 lg:px-6">
                        <div className="cursor-pointer" onClick={() => {
                            navigate("/myflipbooks")
                        }}>
                            <img src="/src/assets/logo.png" width={200} alt="Logo" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-2">
                                <Button className="max-lg:hidden" onClick={() => saveTemplate()}>
                                    {
                                        isLoading ? <LoadingButton /> : "Save Template"
                                    }
                                </Button>
                            </div>
                            <ProfileDropDownCom />
                        </div>
                    </div>
                </header>

                {mainStage.length > 0 && <>
                    <div className="flex-1 max-lg:flex lg:mt-[64px] max-lg:mt-[110px] max-lg:mb-[80px] overflow-y-auto">
                        <div className="flex flex-1">
                            <div className="max-lg:hidden relative lg:flex h-[calc(var(--vh, 1vh) * 100 - 64px)] flex-col items-center justify-between overflow-hidden">
                                <SidebarProvider value={{ selectedItem, setSelectedItem, width: "23rem" }}>
                                    <EditorSidebarNavigation setIsShapeDrawerOpen={setIsShapeDrawerOpen} currentView={currentView} setCurrentView={setCurrentView} mainStage={mainStage} setSelectedShape={setSelectedShape} selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} selectedIndex={selectedIndex} setSelectedItem={setSelectedItem} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                                    <AppSidebar setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} currentView={currentView} setCurrentView={setCurrentView} mainStage={mainStage} selectedIndex={selectedIndex} stageWidth={stageWidth} stageHeight={stageHeight} />
                                    <ShapeEditorLayout setIsShapeDrawerOpen={setIsShapeDrawerOpen} mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage} selectedSubMenu={selectedSubMenu} selectedShape={selectedShape} setSelectedSubMenu={setSelectedSubMenu} flipbookId={id} />
                                </SidebarProvider>
                            </div>

                            <div className="flex flex-1 flex-col lg:max-h-[calc(100vh-64px)] lg:overflow-y-auto">
                                <Outlet context={{ setIsShapeDrawerOpen, isSidebarOpen, selectedShape, selectedIndex, setSelectedIndex, mainStage, setMainStage, selectedSubMenu, setSelectedSubMenu }} />
                            </div>
                        </div>
                    </div>
                    <PublishFlipbookDialog
                        isPublishModalOpen={isPublishModalOpen}
                        setIsPublishModalOpen={setIsPublishModalOpen}
                        flipbookId={id}
                    />
                    <PreviewDialog
                        open={isPreviewOpen}
                        onOpenChange={setIsPreviewOpen}
                        flipbookId={id}
                    />
                    <BottomEditorPanel isEditorDrawerOpen={isEditorDrawerOpen} setIsEditorDrawerOpen={setIsEditorDrawerOpen} setMainStage={setMainStage} mainStage={mainStage} selectedIndex={selectedIndex} currentView={currentView} setCurrentView={setCurrentView} stageWidth={stageWidth} stageHeight={stageHeight} />
                    {
                        windowInnerWidth <= 1024 && (
                            <BottomShapeEditorLayout setIsEditorDrawerOpen={setIsEditorDrawerOpen} setSelectedSubMenu={setSelectedSubMenu} isShapeDrawerOpen={isShapeDrawerOpen} setIsShapeDrawerOpen={setIsShapeDrawerOpen} mainStage={mainStage} selectedIndex={selectedIndex} setMainStage={setMainStage} selectedSubMenu={selectedSubMenu} selectedShape={selectedShape} flipbookId={id} />
                        )
                    }
                </>
                }
            </div>
        </>
    );
}