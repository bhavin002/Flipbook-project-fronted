import { useEffect, useState, useRef } from "react";
import ProfileDropDownCom from "../components/AppLayoutComponents/ProfileDropDownCom";
import { Outlet, useLocation, useNavigate, useParams, useBlocker } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, SlidersHorizontal, Download } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/utils/AppSidebar";
import EditorSidebarNavigation from "@/components/EditorLayoutComponents/EditorSidebarNavigation";
import BottomEditorPanel from "@/components/EditorLayoutComponents/BottomEditorPanel";
import ShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/ShapeEditorLayout";
import BottomShapeEditorLayout from "@/components/EditorLayoutComponents/Widget/BottomShapeEditorLayout";
import { toast } from "sonner";
import useWindowWidth from "@/hooks/use-window-width";
import PreviewDialog from "@/components/EditorLayoutComponents/Preview/PreviewDialog";
import dynamicFontManager from '@/utils/dynamicFontManager';
import { EditTemplateApi, GetAllTemplateCategories, GetTemplateApi } from "@/service/template.service";
import LoadingButton from "@/utils/LoadingButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SaveConfirmationDialog from "@/components/EditorLayoutComponents/SaveConfirmationDialog";

export default function EditorAppLayout({ isSidebarOpen, setIsSidebarOpen }) {
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
    const location = useLocation();
    const [templateType, setTemplateType] = useState("2");
    const [templateCategories, setTemplateCategories] = useState([]);
    const [templateCategory, setTemplateCategory] = useState("all-templates");
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const [pageCounter, setPageCounter] = useState(0);
    const [imageLoadCounterPageWise, setImageLoadCounterPageWise] = useState({});
    const [isAnyChangeMadeInStage, setIsAnyChangeMadeInStage] = useState(false);
    const [isSavingTemplateInternal, setIsSavingTemplateInternal] = useState(false);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const pendingNavigationRef = useRef(null);

    useEffect(() => {
        const fetchTemplateCategories = async () => {
            try {
                const response = await GetAllTemplateCategories();
                const categoriesWithAll = [
                    { _id: "all-templates", name: "All Templates" },
                    ...response.data
                ];
                setTemplateCategories(categoriesWithAll);
            } catch (error) {
                toast.error("Error fetching template categories", {
                    description: error.message || "Something went wrong"
                });
            }
        };
        fetchTemplateCategories();
    }, []);

    useEffect(() => {
        const getFlipbook = async () => {
            try {
                const response = await GetTemplateApi(id);
                setTemplateCategory(response.data?.categoryId || "all-templates");
                setTemplateType(response.data.type);
                setStageWidth(response.data.width);
                setStageHeight(response.data.height);
                let validPageData = response.data.pages;
                validPageData = validPageData.map(e => JSON.parse(e.pageData));
                validPageData.forEach((page, index) => {
                    page.shapes.forEach(async (shape) => {
                        if (shape.type === 'text') {
                            await dynamicFontManager.loadFontById(shape.fontId);
                        }
                    })
                });
                setMainStage(validPageData);
                setIsInitialLoad(true);
            } catch (error) {
                toast.error(error?.message || "Error fetching page data");
            }
        };
        if (id) {
            getFlipbook();
        }
    }, [id]);

    // Removed auto-save interval as per user request - API should only be called on manual save.

    const blocker = useBlocker(
        ({ nextLocation }) => {
            const isLeavingEditor = !nextLocation.pathname.includes('/editor');
            return isAnyChangeMadeInStage && isLeavingEditor && isInitialLoad;
        }
    );

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isAnyChangeMadeInStage && isInitialLoad) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isAnyChangeMadeInStage, isInitialLoad]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            pendingNavigationRef.current = blocker.proceed;
            setShowSaveDialog(true);
        }
    }, [blocker]);

    const handleSaveAndNavigate = async () => {
        try {
            handleSaveTemplateClick();
            setShowSaveDialog(false);
            // Navigation will happen in the finalized useEffect once isSavingTemplateInternal completes
        } catch (error) {
            toast.error("Failed to initiate save", {
                description: error.message || "Something went wrong"
            });
        }
    };

    const handleCancelNavigation = () => {
        setIsAnyChangeMadeInStage(false);
        setShowSaveDialog(false);
        if (blocker.state === 'blocked') {
            blocker.reset();
        }
        pendingNavigationRef.current = null;
        setTimeout(() => {
            navigate('/myflipbooks/flipbooks');
        }, 0);
    };

    const handleDiscardAndNavigate = () => {
        setIsAnyChangeMadeInStage(false);
        setShowSaveDialog(false);
        if (pendingNavigationRef.current) {
            pendingNavigationRef.current();
            pendingNavigationRef.current = null;
        }
    };

    const handlePreviewClick = async () => {
        setIsPreviewOpen(true);
    };

    const cloneStageElements = (stage) => {
        const layer = stage.children[0];
        const bg = layer.children[0];
        const target = layer.children[1];

        const targetWidth = target.width() / target.scaleX();
        const targetHeight = target.height() / target.scaleY();

        const clonedNode = target.clone({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
        const clonedBg = bg.clone({
            width: targetWidth,
            height: targetHeight,
            x: 0,
            y: 0
        });

        const group = new window.Konva.Group({
            width: targetWidth,
            height: targetHeight,
            x: 0,
            y: 0
        });

        group.add(clonedBg);
        group.add(clonedNode);

        return { group, targetWidth, targetHeight };
    };

    const generateThumbnails = async (stage, isFirstPage = false) => {
        if (!stage) return null;

        const { group, targetWidth, targetHeight } = cloneStageElements(stage);

        const dataUrl = await group.toDataURL({
            x: 0,
            y: 0,
            width: targetWidth,
            height: targetHeight,
            pixelRatio: isFirstPage ? 1 : 0.4,
            mimeType: "image/jpeg",
            quality: isFirstPage ? 1 : 0.1
        });

        return await (await fetch(dataUrl)).blob();
    };

    const saveTemplate = async (showToast = true) => {
        try {
            if (showToast) setIsLoading(true);
            const formData = new FormData();

            mainStage.forEach((page, idx) => {
                // Remove the Blob property so it doesn't get stringified as {}
                const { thumbnails, ...cleanPageData } = page;
                const pageToSave = {
                    ...cleanPageData,
                    selectedShapes: [],
                    stageref: null
                };
                formData.append('pages', JSON.stringify(pageToSave));
            });

            mainStage.forEach((stage, index) => {
                if (stage.thumbnails instanceof Blob) {
                    // Match the backend Multer config: upload.array("thumbnails")
                    formData.append("thumbnails", stage.thumbnails, `thumbnail_${index}.jpg`);
                }
            });

            formData.append('width', stageWidth);
            formData.append('height', stageHeight);
            formData.append('type', templateType);
            if (templateCategory !== "all-templates") {
                formData.append('categoryId', templateCategory);
            }

            const response = await EditTemplateApi(id, formData);
            if (showToast) {
                toast.success("Template saved successfully", {
                    description: response.data.message
                });
            }
            setIsAnyChangeMadeInStage(false);
            return true;
        } catch (error) {
            if (showToast) {
                toast.error(error?.message || "Error saving template");
            }
            return false;
        } finally {
            if (showToast) setIsLoading(false);
            setIsSavingTemplateInternal(false);
        }
    };

    const handleSaveTemplateClick = () => {
        // Clear old thumbnails (which might be URL strings) to ensure we only collect fresh Blobs
        setMainStage(prev => prev.map(page => {
            const { thumbnails, ...rest } = page;
            return rest;
        }));
        setIsSavingTemplateInternal(true);
        setPageCounter(0);
        setSelectedIndex(0);
    };

    useEffect(() => {
        const finalizeSave = async () => {
            if (isSavingTemplateInternal && !isLoading && pageCounter === mainStage.length - 1) {
                // Only proceed if ALL pages have a Blob in thumbnails
                const allThumbnailsReady = mainStage.every(page => page.thumbnails instanceof Blob);
                if (allThumbnailsReady) {
                    const success = await saveTemplate();
                    if (success && pendingNavigationRef.current) {
                        pendingNavigationRef.current();
                        pendingNavigationRef.current = null;
                    }
                }
            }
        };
        finalizeSave();
    }, [pageCounter, isSavingTemplateInternal, mainStage, isLoading]);

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
                className="drag-mask bg-[url(/assets/icons/Link.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="square-caption"
                className="drag-mask bg-[url(/assets/icons/Plus.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="embed-code"
                className="drag-mask bg-[url(/assets/icons/Code.svg)] bg-[#ebf0fc] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
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
                className="drag-mask bg-[url(/assets/icons/SlideShow.svg)] bg-[#ebf0fc] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="photo-slideshow"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Audio & Video */}
            <div
                id="video-embed"
                className="drag-mask bg-[url(/assets/icons/Play.svg)] bg-[#000000] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="video-button"
                className="drag-mask bg-[url(/assets/icons/VideoButton.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="audio-button"
                className="drag-mask bg-[url(/assets/icons/AudioButton.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Shop */}
            <div
                id="shop-area"
                className="drag-mask bg-[#7bc2ff] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="shop-button"
                className="drag-mask bg-[url(/assets/icons/ShopButton.svg)] bg-[#000000] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
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
                className="drag-mask bg-[url(/assets/icons/PrevPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-next-page"
                className="drag-mask bg-[url(/assets/icons/NextPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-page"
                className="drag-mask bg-[url(/assets/icons/GoToPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-first-page"
                className="drag-mask bg-[url(/assets/icons/GoToFirstPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="go-to-last-page"
                className="drag-mask bg-[url(/assets/icons/GoToFirstPage.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Social (reusing go-to-button-link for most, but adding specific ones for clarity) */}
            <div
                id="tiktok-social"
                className="drag-mask bg-[url(/assets/icons/social/TikTok.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="pinterest-social"
                className="drag-mask bg-[url(/assets/icons/social/Pinterest.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="reddit-social"
                className="drag-mask bg-[url(/assets/icons/social/Reddit.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="spotify-social"
                className="drag-mask bg-[url(/assets/icons/social/Spotify.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="youtube-social"
                className="drag-mask bg-[url(/assets/icons/social/Youtube.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="instagram-social"
                className="drag-mask bg-[url(/assets/icons/social/Instagram.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="messenger-social"
                className="drag-mask bg-[url(/assets/icons/social/Massenger.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="facebook-social"
                className="drag-mask bg-[url(/assets/icons/social/Facebook.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="linkedin-social"
                className="drag-mask bg-[url(/assets/icons/social/LinkedIn.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="twitter-social"
                className="drag-mask bg-[url(/assets/icons/social/Twitter.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="snapchat-social"
                className="drag-mask bg-[url(/assets/icons/social/Snapchat.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="whatsapp-social"
                className="drag-mask bg-[url(/assets/icons/social/Whatsapp.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            {/* Drag masks for Other */}
            <div
                id="cart-other"
                className="drag-mask bg-[url(/assets/icons/Cart.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="basket-other"
                className="drag-mask bg-[url(/assets/icons/Basket.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>
            <div
                id="credit-card-other"
                className="drag-mask bg-[url(/assets/icons/CreditCard.svg)] bg-[#41485d] absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-0 h-[80px] w-[16px] pointer-events-none"
            ></div>

            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 right-0 z-10 bg-white">
                    <div className="flex h-16 w-full justify-between shrink-0 items-center px-4 lg:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div
                                className="relative flex items-center cursor-pointer"
                                onClick={() => navigate("/myflipbooks/flipbooks")}
                            >
                                <img src="/assets/logo.png" width={200} className="my-2" alt="Logo" />
                                {/* <span className="absolute -right-6 top-3 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-[1px] rounded cursor-default">
                                    BETA
                                </span> */}
                            </div>
                        </div>
                        <div className="flex-1 gap-2 flex justify-center max-md:hidden h-9">
                            <Select value={templateType} onValueChange={(val) => { setTemplateType(val); setIsAnyChangeMadeInStage(true); }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Product Template</SelectItem>
                                    <SelectItem value="2">Normal Template</SelectItem>
                                    <SelectItem value="3">Text Template</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={templateCategory} onValueChange={(val) => { setTemplateCategory(val); setIsAnyChangeMadeInStage(true); }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        templateCategories.map(category => (
                                            <SelectItem key={category._id} value={category._id}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-2">
                                <Button variant="outline" className="max-lg:hidden" onClick={handlePreviewClick} disabled={isPreviewLoading || !isInitialLoad}>
                                    <Eye className="mr-2 h-4 w-4" /> Preview
                                </Button>
                                <Button className="max-lg:hidden" disabled={isLoading || isSavingTemplateInternal || !isInitialLoad} onClick={handleSaveTemplateClick}>
                                    {isLoading || isSavingTemplateInternal ? <LoadingButton /> : "Save Template"}
                                </Button>
                            </div>
                            <ProfileDropDownCom />
                        </div>
                    </div>
                    <div className="relative lg:flex px-4">
                        <div className="hidden items-center gap-2 max-md:flex">
                            <Select value={templateType} onValueChange={setTemplateType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Product Template</SelectItem>
                                    <SelectItem value="2">Normal Template</SelectItem>
                                    <SelectItem value="3">Text Template</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={templateCategory} onValueChange={setTemplateCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select template type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        templateCategories.map(category => (
                                            <SelectItem key={category._id} value={category._id}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
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
                                <Outlet context={{ setIsShapeDrawerOpen, isSidebarOpen, selectedShape, selectedIndex, setSelectedIndex, mainStage, setMainStage, selectedSubMenu, setSelectedSubMenu, isInitialLoad, setIsInitialLoad, isPublishModalOpen, setIsPublishModalOpen, isSavingTemplateInternal, setIsSavingTemplateInternal, pageCounter, setPageCounter, imageLoadCounterPageWise, setImageLoadCounterPageWise, isAnyChangeMadeInStage, setIsAnyChangeMadeInStage, stageWidth, stageHeight }} />
                            </div>
                        </div>
                    </div>
                    <PreviewDialog
                        open={isPreviewOpen}
                        onOpenChange={setIsPreviewOpen}
                        flipbookId={id}
                        startPage={selectedIndex + 1}
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
            <SaveConfirmationDialog
                isOpen={showSaveDialog}
                onOpenChange={setShowSaveDialog}
                onSave={handleSaveAndNavigate}
                onCancel={handleCancelNavigation}
                isLoading={isSavingTemplateInternal}
            />
        </>
    );
}