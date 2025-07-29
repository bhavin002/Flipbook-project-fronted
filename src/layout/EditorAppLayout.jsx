import { useEffect, useState } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PublishFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, Share2, SlidersHorizontal } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/utils/AppSidebar";
import EditorSidebarNavigation from "@/components/EditorLayoutComponents/EditorSidebarNavigation";
import BottomEditorPanel from "@/components/EditorLayoutComponents/BottomEditorPanel";
import ShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/ShapeEditorLayout";
import BottomShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/BottomShapeEditorLayout";
import { GetFlipbookApi, UpdateFlipbookPageDataApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import useWindowWidth from "@/hooks/use-window-width";
import EditFlipbookName from "@/utils/EditFlipbookName";
import PreviewDialog from "@/components/EditorLayoutComponents/Preview/PreviewDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { flipbookType } from "@/utils/enum";
import RenameFlipbookDialog from "@/components/AppLayoutComponents/Sidebar/Home/MyFlipbooks/RenameFlipbookDialog";

export default function EditorAppLayout({ isSidebarOpen, setIsSidebarOpen }) {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedShape, setSelectedShape] = useState([]);
    const [currentView, setCurrentView] = useState(null);
    const [flipbookName, setFlipbookName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [stageWidth, setStageWidth] = useState(0);
    const [stageHeight, setStageHeight] = useState(0);
    const windowInnerWidth = useWindowWidth();
    const { id } = useParams();
    const [mainStage, setMainStage] = useState([]);
    const navigate = useNavigate();
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [isCustomizeLoading, setIsCustomizeLoading] = useState(false);
    const location = useLocation();
    const [publishing, setPublishing] = useState(false);
    const [isTemplate, setIsTemplate] = useState(false);
    const state = location.state;
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [flipbookObj, setFlipbookObj] = useState(null);

    useEffect(() => {
        const getFlipbook = async () => {
            try {
                const response = await GetFlipbookApi(id);
                setIsTemplate(response.data.flipbookType === flipbookType.TEMPLATE)
                setFlipbookName(response.data.name);
                setStageWidth(response.data.width);
                setStageHeight(response.data.height);
                setFlipbookObj({
                    _id: response.data._id || response.data.id,
                    name: response.data.name,
                    description: response.data.description || "",
                    flipbookType: response.data.flipbookType
                });
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

    const updatePageData = async () => {
        try {
            setIsLoading(true);
            mainStage.forEach(e => {
                e.temp = e.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            });
            const temp = JSON.parse(JSON.stringify(mainStage))
            temp.forEach(e => {
                e.selectedShapes = [];
                e.shapes = e.temp;
                delete e.temp;
                e.stageref = null;
            });
            await UpdateFlipbookPageDataApi(id, {
                width: stageWidth,
                height: stageHeight,
                pages: temp.map(e => ({
                    pageData: JSON.stringify(e),
                })),
            });
        } catch (error) {
            toast.error("Failed to update page data", {
                description: error.message || "Something went wrong"
            })
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (id && mainStage.length > 0 && !publishing) {
                updatePageData();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [mainStage, publishing]);

    const [selectedSubMenu, setSelectedSubMenu] = useState(null);
    const [isShapeDrawerOpen, setIsShapeDrawerOpen] = useState(false);
    const [isEditorDrawerOpen, setIsEditorDrawerOpen] = useState(false);

    const handlePreviewClick = async () => {
        try {
            setIsPreviewLoading(true);
            await updatePageData();
            setIsPreviewOpen(true);
        } catch (error) {
            toast.error("Failed to update page data before preview", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const handleCustomizeClick = async () => {
        try {
            setIsCustomizeLoading(true);
            await updatePageData();
            navigate(`/customize/${id}`);
        } catch (error) {
            toast.error("Failed to update page data before customize", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsCustomizeLoading(false);
        }
    };

    useEffect(() => {
        if (state?.publish) {
            setIsPublishModalOpen(true);
            navigate(location.pathname, { replace: true });
        }
    }, [state]);

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
                        <div className="relative lg:flex hidden">
                            <div className="flex items-center gap-2">
                                <EditFlipbookName isLoading={isLoading} flipbookId={id} flipbookName={flipbookName} setFlipbookName={setFlipbookName} updatePageData={updatePageData} isTemplate={isTemplate} />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-2">
                                <div className="flex gap-2 max-md:hidden">
                                    <Button variant="outline" onClick={handleCustomizeClick} disabled={isCustomizeLoading}>
                                        <SlidersHorizontal />
                                    </Button>
                                    <Button variant="outline">
                                        <Download />
                                    </Button>
                                    <Button variant="outline" onClick={handlePreviewClick} disabled={isPreviewLoading}>
                                        <Eye /> Preview
                                    </Button>
                                </div>
                                <div className="hidden max-md:block">
                                    <DropdownMenu >
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon" >
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem onClick={handleCustomizeClick} disabled={isCustomizeLoading}>
                                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                                <span>Customize</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download className="mr-2 h-4 w-4" />
                                                <span>Download</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={handlePreviewClick} disabled={isPreviewLoading}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                <span>Preview</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {/* Save Template/Share now button logic */}
                                {isTemplate ? (
                                    <Button className="hidden max-md:block" onClick={() => setIsRenameModalOpen(true)}>
                                        Save template
                                    </Button>
                                ) : (
                                    <Button className="hidden max-md:block" onClick={() => setIsPublishModalOpen(true)}>
                                        <Share2 />
                                    </Button>
                                )}
                                {isTemplate ? (
                                    <Button className="max-md:hidden" onClick={() => setIsRenameModalOpen(true)}>
                                        Save template
                                    </Button>
                                ) : (
                                    <Button className="max-md:hidden" onClick={() => setIsPublishModalOpen(true)}>
                                        Share now
                                    </Button>
                                )}
                            </div>
                            <ProfileDropDownCom />
                        </div>
                    </div>
                    <div className="relative lg:flex px-4">
                        <div className="hidden items-center gap-2 max-lg:flex">
                            <EditFlipbookName isLoading={isLoading} flipbookId={id} flipbookName={flipbookName} setFlipbookName={setFlipbookName} updatePageData={updatePageData} />
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
                        mainStage={mainStage}
                        stageWidth={stageWidth}
                        stageHeight={stageHeight}
                        publishing={publishing}
                        setPublishing={setPublishing}
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
            <RenameFlipbookDialog isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen} flipbook={flipbookObj} redirectToTemplate={true} />
        </>
    );
}