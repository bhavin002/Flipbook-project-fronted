import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, ListX, LockKeyhole, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import GenericSelection from "@/utils/GenericSelection";
import { GetWorkspaceGroupsApi } from "@/service/workspace.group.service";
import { GetFlipbookPublishInfoApi, UpdatePublishFlipbookApi, UpdateFlipbookPublishDetailsOnlyApi, UpdatePublishThumbnailsApi } from "@/service/flipbook.publish.service"; // Import the new API
import { PublishFlipbookApi } from "@/service/flipbook.publish.service";
import { flipbookVisibility } from "@/utils/enum";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { useNavigate } from "react-router-dom";
import { UpdateFlipbookPageDataApi } from "@/service/flipbook.service";
import { LoadingOverlay } from "@/utils/Skeleton";
import { GetWorkspaceReadersApi } from "@/service/teammate.service";
import { Progress } from "@/components/ui/progress";
import { jsPDF } from "jspdf";
import JSZip from 'jszip';

export default function PublishFlipbookDialog({
    isPublishModalOpen,
    setIsPublishModalOpen,
    flipbookId, // Add flipbookId prop
    onPublishSuccess, // Optional callback for success handling
    setIsAnyChangeMadeInStage,
    mainStage,
    stageWidth,
    stageHeight,
    publishing,
    setPublishing,
    pageCounter,
    imageLoadCounterPageWise

}) {
    const [selectedRadio, setSelectedRadio] = useState("email");
    const [emailInput, setEmailInput] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const [addedEmails, setAddedEmails] = useState([]);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("public");
    const [title, setTitle] = useState("New flipbook");
    const [description, setDescription] = useState("");
    const [groups, setGroups] = useState([]);
    const [readers, setReaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sendNotification, setSendNotification] = useState(false);
    const [trackReaders, setTrackReaders] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const navigate = useNavigate();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Fetch data when component mounts or modal opens
    useEffect(() => {
        if (isPublishModalOpen && flipbookId) {
            fetchInitialData();
        }
    }, [isPublishModalOpen, flipbookId]);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [groupsResponse, readersResponse, publishInfoResponse] = await Promise.all([
                GetWorkspaceGroupsApi(),
                GetWorkspaceReadersApi(),
                GetFlipbookPublishInfoApi(flipbookId)
            ]);

            setGroups(groupsResponse.data || []);
            setReaders(readersResponse.data || []);

            // Process publish info response
            const { publishFlipbookData, flipbookData, isPublished } = publishInfoResponse.data;
            setIsPublished(isPublished);
            if (isPublished && publishFlipbookData) {
                // Set title from flipbookData
                setTitle(publishFlipbookData.name);

                // Set description (assuming it might be part of publishFlipbookData, adjust if stored elsewhere)
                setDescription(publishFlipbookData.description);

                // Determine active tab based on visibility and isVisible
                const visibility = publishFlipbookData.visibility;
                const isVisible = publishFlipbookData.isVisible;

                if (visibility === flipbookVisibility.PUBLIC && isVisible) {
                    setActiveTab("public");
                } else if (visibility === flipbookVisibility.PUBLIC && !isVisible) {
                    setActiveTab("unlisted");
                } else if (visibility === flipbookVisibility.PASSWORD) {
                    setActiveTab("passwordLocked");
                    setPassword(publishFlipbookData.password ? "******" : "");
                } else if (visibility === flipbookVisibility.PRIVATE) {
                    setActiveTab("private");
                    setSelectedRadio("email");
                    setAddedEmails(publishFlipbookData.privateEmails);
                } else if (visibility === flipbookVisibility.READERS_ONLY) {
                    setActiveTab("private");
                    setSelectedRadio("readers");
                    // Handle reader and group selection
                    if (publishFlipbookData.allReaderGroups) {
                        setCreatedByFilter(["All readers and groups"]);
                    } else {
                        const selectedLabels = [];
                        // Map reader IDs to labels
                        publishFlipbookData.readerIds.forEach(readerId => {
                            const reader = readersResponse.data.find(r => r._id === readerId);
                            if (reader) {
                                selectedLabels.push(reader.name || reader.email);
                            }
                        });
                        // Map group IDs to labels
                        publishFlipbookData.readerGroupIds.forEach(groupId => {
                            const group = groupsResponse.data.find(g => g._id === groupId);
                            if (group) {
                                selectedLabels.push(group.name);
                            }
                        });
                        setCreatedByFilter(selectedLabels);
                    }
                }
            } else {
                // Set title from flipbookData
                setTitle(flipbookData.name);

                // Set description from flipbookData
                setDescription(flipbookData.description || "");
            }
        } catch (err) {
            toast.error("Failed to fetch initial data", {
                description: err.message || "Something went wrong while fetching data."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (value) => {
        setSelectedRadio(value);
    };

    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmailInput(email);
        setIsEmailValid(validateEmail(email) || email === "");
    };

    const handleAddEmail = () => {
        if (emailInput.trim() && validateEmail(emailInput) && !addedEmails.includes(emailInput)) {
            setAddedEmails([...addedEmails, emailInput]);
            setEmailInput("");
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    const handleRemoveEmail = (emailToRemove) => {
        setAddedEmails(addedEmails.filter(email => email !== emailToRemove));
    };

    // Transform API data to match GenericSelection format
    const transformDataForGenericSelection = () => {
        const transformedGroups = groups.map(group => ({
            value: group._id,
            label: group.name
        }));

        // Filter only accepted readers
        const transformedReaders = readers
            .filter(reader => reader.status)
            .map(reader => ({
                value: reader._id,
                label: reader.name || reader.email
            }));

        return [
            {
                name: "Groups",
                groups: transformedGroups
            },
            {
                name: "Readers",
                readers: transformedReaders
            }
        ];
    };

    // Check if "All readers and groups" is selected
    const isAllSelected = () => {
        return createdByFilter.includes("All readers and groups");
    };

    // Get selected reader and group IDs from createdByFilter
    const getSelectedIds = () => {
        // If "All readers and groups" is selected, return all IDs
        if (isAllSelected()) {
            const allReaderIds = readers
                .filter(reader => reader.status)
                .map(reader => reader._id);
            const allGroupIds = groups.map(group => group._id);

            return { readerIds: allReaderIds, groupIds: allGroupIds };
        }

        // Otherwise, return only selected IDs
        const readerIds = [];
        const groupIds = [];

        createdByFilter.forEach(selectedLabel => {
            // Skip "All readers and groups" label
            if (selectedLabel === "All readers and groups") return;

            // Check if it's a reader
            const reader = readers.find(r => (r.name || r.email) === selectedLabel);
            if (reader) {
                readerIds.push(reader._id);
                return;
            }

            // Check if it's a group
            const group = groups.find(g => g.name === selectedLabel);
            if (group) {
                groupIds.push(group._id);
            }
        });

        return { readerIds, groupIds };
    };

    // Build payload based on active tab
    const buildPayload = () => {
        const basePayload = {
            flipbookId,
            title: title.trim(),
            description: description?.trim() || "",
        };

        switch (activeTab) {
            case "public":
                return {
                    ...basePayload,
                    visibility: flipbookVisibility.PUBLIC,
                    isVisible: true
                };

            case "unlisted":
                return {
                    ...basePayload,
                    visibility: flipbookVisibility.PUBLIC,
                    isVisible: false
                };

            case "passwordLocked":
                return {
                    ...basePayload,
                    visibility: flipbookVisibility.PASSWORD,
                    password: password.trim()
                };

            case "private":
                if (selectedRadio === "email") {
                    return {
                        ...basePayload,
                        visibility: flipbookVisibility.PRIVATE,
                        privateEmails: addedEmails
                    };
                } else {
                    const { readerIds, groupIds } = getSelectedIds();
                    return {
                        ...basePayload,
                        visibility: flipbookVisibility.READERS_ONLY,
                        readerIds,
                        readerGroupIds: groupIds,
                        allReaderGroups: isAllSelected(),
                        ...(sendNotification && { sendNotification: true }),
                        ...(trackReaders && { trackReaders: true })
                    };
                }

            default:
                return basePayload;
        }
    };

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

    async function generateThumbnails(mainStage) {
        const thumbnails = [];
        for (let i = 0; i < mainStage.length; i++) {
            const stage = mainStage[i];
            const stageRef = stage.stageref.current;
            if (!stageRef) continue;
            const { clonedNode, targetWidth, targetHeight } = cloneStageElements(stageRef);
            const dataUrl = await clonedNode.toDataURL({
                x: 0,
                y: 0,
                width: targetWidth,
                crossOriginIsolated: false,
                height: targetHeight,
                pixelRatio: 1,
                mimeType: 'image/png',
            });
            const blob = await (await fetch(dataUrl)).blob();
            thumbnails.push(blob);
        }
        return thumbnails;
    }

    function buildFormData(payload, thumbnails) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(`${key}[]`, item));
            } else if (typeof value === 'object' && value !== null) {
                formData.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });
        if (thumbnails && thumbnails.length) {
            thumbnails.forEach((thumb, idx) => {
                formData.append('thumbnails', thumb, `thumbnail_${idx}.jpg`);
            });
        }
        return formData;
    }

    // PDF Start
    // ==== STAGE TO DATAURL - FIXED ==== 
    const stageToDataURL = async (stageRef, { bleedPx = 0 } = {}) => {
        const stageContainer = stageRef.current.children[0].children[1];
        if (!stageContainer) return null;

        // Konva Stage (not layer)
        const stage = stageContainer;
        if (!stage) return null;

        const oldScale = stage.scale();
        const oldPos = stage.position();
        const oldStageWidth = stage.width();
        const oldStageHeight = stage.height();

        stage.scale({ x: 1, y: 1 });
        stage.position({ x: 0, y: 0 });
        stage.height(stageHeight);
        stage.width(stageWidth);
        stage.draw();

        // 3. Original size + bleed
        const w = stage.width() + bleedPx * 2;
        const h = stage.height() + bleedPx * 2;

        // 4. High quality export
        const canvas = await stage.toCanvas({
            pixelRatio: 2,           // 1:1 pixel perfect
            x: -bleedPx,
            y: -bleedPx,
            width: w,
            height: h,
        });

        // 5. Restore original zoom (editor view)
        stage.scale(oldScale);
        stage.position(oldPos);
        stage.width(oldStageWidth);
        stage.height(oldStageHeight);
        stage.draw();

        // 6. Add background
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const ctx = finalCanvas.getContext('2d');

        const bgColor = '#FFFFFF';
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        ctx.drawImage(canvas, 0, 0);

        return finalCanvas.toDataURL('image/jpeg', 0.95);
    };
    const buildPdfFromDataUrls = (dataUrls, pageSizePx, dpi = 300) => {
        const mm = (px) => (px * 75) / dpi;
        const pdf = new jsPDF({
            unit: 'mm',
            format: [mm(pageSizePx.w), mm(pageSizePx.h)],
            orientation: pageSizePx.w > pageSizePx.h ? 'l' : 'p',
        });

        dataUrls.forEach((url, i) => {
            if (i > 0) pdf.addPage();
            pdf.addImage(url, 'JPEG', 0, 0, mm(pageSizePx.w), mm(pageSizePx.h));
        });

        return pdf;
    };
    const generateFlipbookPdf = async (mainStage, stageWidth, stageHeight, bleedPx = 0) => {
        const dataUrls = [];
        for (const page of mainStage) {
            const url = await stageToDataURL(page.stageref, { bleedPx });
            if (url) dataUrls.push(url);
        }

        const pdf = buildPdfFromDataUrls(dataUrls, { w: stageWidth, h: stageHeight }, 300);
        return pdf.output('blob');
    };
    const handleDownloadPDF = async () => {
        if (!flipbookId || mainStage.length === 0) {
            toast.error("No pages to export");
            return;
        }

        setPublishing(true);
        try {
            const pdfBlob = await generateFlipbookPdf(mainStage, stageWidth, stageHeight, 0);

            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `flipbook_${flipbookId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);

            toast.success("PDF downloaded successfully!");
        } catch (err) {
            toast.error("PDF generation failed", { description: err.message });
        } finally {
            setPublishing(false);
        }
    };
    // PDF END


    // ZIP Start
    const generateFlipbookImages = async (mainStage, bleedPx = 0) => {
        const images = [];
        for (let i = 0; i < mainStage.length; i++) {
            const url = await stageToDataURL(mainStage[i].stageref, { bleedPx });
            if (url) {
                const blob = await (await fetch(url)).blob();
                images.push({
                    // generateFlipbookImages ma name change karo (optional)
                    name: images.length === 1
                        ? `flipbook_${flipbookId}.jpg`
                        : `page_${i + 1}.jpg`,
                    blob
                });
            }
        }
        return images;
    };
    const createZipFromImages = async (images, zipName) => {
        const zip = new JSZip();

        // Add each image to zip
        images.forEach((img) => {
            zip.file(img.name, img.blob);
        });

        // Generate ZIP blob
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        return zipBlob;
    };
    const handleDownloadZIP = async () => {
        if (!flipbookId || mainStage.length === 0) {
            toast.error("No pages to export");
            return;
        }

        setPublishing(true);
        try {
            const images = await generateFlipbookImages(mainStage, 0);

            // 🔥 NEW: SINGLE PAGE = Direct JPG | MULTIPLE = ZIP
            if (images.length === 1) {
                const blob = images[0].blob;
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flipbook_${flipbookId}.jpg`;  // .jpg extension
                a.click();
                URL.revokeObjectURL(url);
                toast.success("Image downloaded successfully!");
            }
            else {
                const zipBlob = await createZipFromImages(images, `flipbook_${flipbookId}`);
                const url = URL.createObjectURL(zipBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `flipbook_${flipbookId}_pages.zip`;
                a.click();
                URL.revokeObjectURL(url);
                toast.success(`ZIP with ${images.length} pages downloaded!`);
            }

        } catch (err) {
            console.error(err);
            toast.error("Download failed", { description: err.message });
        } finally {
            setPublishing(false);
        }
    };
    // END Start

    const handleDownloadJSON = () => {
        if (!flipbookId || mainStage.length === 0) {
            toast.error("No data to export");
            return;
        }

        // 🔥 EXACT SAME JSON JO SERVER PAR JAI CHE!
        mainStage.forEach(e => {
            e.temp = e.stageref.current.children[0].children[1].children.map(node =>
                JSON.parse(JSON.stringify(node.attrs))
            ) || [];
        });

        const temp = JSON.parse(JSON.stringify(mainStage));
        temp.forEach(e => {
            e.selectedShapes = [];
            e.shapes = e.temp;
            delete e.temp;
            e.stageref = null;
        });

        const finalJSON = {
            width: stageWidth,
            height: stageHeight,
            pages: temp.map(e => ({
                pageData: e  // Server par exact aaj jai che!
            }))
        };

        // Download karo
        const blob = new Blob([JSON.stringify(finalJSON, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flipbook_${flipbookId}_SERVER.json`;
        a.click();
        URL.revokeObjectURL(url);

        toast.success("JSON Downloaded – Ready for Import!");
    };



    const handlePublish = async () => {
        if (!flipbookId) {
            console.error('FlipbookId is required for publishing');
            return;
        }

        setPublishing(true);

        try {

            // mainStage.forEach(e => {
            //     e.temp = e.stageref.current.children[0].children[1].children.map(e => JSON.parse(JSON.stringify(e.attrs))) || [];
            // });
            const temp = JSON.parse(JSON.stringify(mainStage))
            temp.forEach((e, index) => {
                e.selectedShapes = [];
                e.shapes = e.shapes;
                e.stageref = null;
                e.thumbnails = mainStage[index].thumbnails;
            });
            // const temp = mainStage.map(e => {
            //     const shapes = e.shapes;
            //     return { pageData: shapes };
            // });
            await UpdateFlipbookPageDataApi(flipbookId, {
                width: stageWidth,
                height: stageHeight,
                pages: temp.map(e => ({
                    pageData: JSON.stringify(e),
                })),
            });

            const payload = buildPayload();

            let response;
            if (isPublished) {
                response = await UpdateFlipbookPublishDetailsOnlyApi(payload);

                const thumbnails = mainStage.map(e => e.thumbnails);
                const thumbnailFormData = new FormData();
                thumbnailFormData.append('flipbookId', flipbookId);
                thumbnails.forEach((thumb, idx) => {
                    thumbnailFormData.append('thumbnails', thumb, `thumbnail_${idx}.jpg`);
                });

                UpdatePublishThumbnailsApi(thumbnailFormData).catch(err => {
                    console.error('Failed to update thumbnails:', err);
                });
            } else {
                const thumbnails = mainStage.map(e => e.thumbnails);
                const formData = buildFormData(payload, thumbnails);
                response = await PublishFlipbookApi(formData);
            }

            // Call success callback if provided
            if (onPublishSuccess) {
                onPublishSuccess(response);
            }

            // Reset change state first to prevent save dialog
            setIsAnyChangeMadeInStage(false);

            // Close modal on success
            setIsPublishModalOpen(false);

            // Reset form state
            resetForm();

            // Navigate after a brief delay to ensure state updates
            setTimeout(() => {
                navigate(`/details/${flipbookId}`);
            }, 100);

        } catch (err) {
            toast.error("Failed to publish flipbook", {
                description: err.message || "Something went wrong while publishing."
            });
        } finally {
            setPublishing(false);
        }
    };


    // Reset form to initial state
    const resetForm = () => {
        setTitle("New flipbook");
        setDescription("");
        setPassword("");
        setAddedEmails([]);
        setCreatedByFilter([]);
        setActiveTab("public");
        setSelectedRadio("email");
        setSendNotification(false);
        setTrackReaders(false);
    };

    const filters = [
        {
            id: 'createdBy',
            options: transformDataForGenericSelection(),
            selectedValues: createdByFilter,
            onChange: setCreatedByFilter
        }
    ];
    const isPublishDisabled = !title.trim() ||
        (activeTab === "passwordLocked" && !password.trim()) ||
        (activeTab === "private" && selectedRadio === "email" && addedEmails.length === 0) ||
        (activeTab === "private" && selectedRadio === "readers" && createdByFilter.length === 0) ||
        publishing;



    return (
        <Dialog open={isPublishModalOpen} onOpenChange={setIsPublishModalOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Publish your work</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                {pageCounter !== mainStage.length - 1 && <Progress value={100 * pageCounter / mainStage.length} className="w-full" />}
                <div className="px-1 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {loading && <LoadingOverlay />}
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={!title.trim() ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description
                                {/* {Object.values(imageLoadCounterPageWise).some((count) => count > 0)} */}
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Use a maximum of 256 character"
                                className="resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={256}
                            />
                        </div>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="public">
                                <Globe className="w-4 h-4 mr-2 hidden md:block" /> Public
                            </TabsTrigger>
                            <TabsTrigger value="unlisted">
                                <ListX className="w-4 h-4 mr-2 hidden md:block" /> Unlisted
                            </TabsTrigger>
                            <TabsTrigger value="passwordLocked">
                                <LockKeyhole className="w-4 h-4 mr-2 hidden md:block" /> Locked
                            </TabsTrigger>
                            <TabsTrigger value="private">
                                <Lock className="w-4 h-4 mr-2 hidden md:block" /> Private
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="public">
                            <p className="text-sm font-medium text-gray-600 my-4">Your catalog will appear on your public FlipDrag profile and it will be indexed
                                by the search engines (Google, Bing, etc).</p>
                        </TabsContent>

                        <TabsContent value="unlisted">
                            <p className="text-sm font-medium text-gray-600 my-4">Your catalog will not appear anywhere on the web.
                                Only people you personally share the direct link with will have access to your catalog.</p>
                        </TabsContent>

                        <TabsContent value="passwordLocked">
                            <div className="grid gap-2 my-4">
                                <Label htmlFor="password">
                                    Password <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Enter password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web. Your readers must enter the password you have set in order to read your flipbook.</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="private">
                            <div className="space-y-4 my-4">
                                <RadioGroup
                                    className="flex"
                                    value={selectedRadio}
                                    onValueChange={handleRadioChange}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="byEmail" />
                                        <Label htmlFor="byEmail">By emails</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="readers" id="readersOnly" />
                                        <Label htmlFor="readersOnly">Readers Only</Label>
                                    </div>
                                </RadioGroup>

                                {selectedRadio === "email" && (
                                    <>
                                        <div className="flex w-full space-x-4">
                                            <Input
                                                placeholder="Enter email addresses"
                                                className={`flex-grow ${!isEmailValid && emailInput ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                                value={emailInput}
                                                onChange={handleEmailChange}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddEmail();
                                                    }
                                                }}
                                            />
                                            <Button onClick={handleAddEmail}>
                                                Add email
                                            </Button>
                                        </div>
                                        {addedEmails.length > 0 && (
                                            <div className="space-y-2">
                                                <Label>Who has access</Label>
                                                <div className="border rounded-md p-3 bg-gray-50">
                                                    <ScrollArea className="max-h-24 overflow-auto">
                                                        <div className="flex flex-wrap gap-2">
                                                            {addedEmails.map((email, index) => (
                                                                <Badge
                                                                    key={index}
                                                                    variant="secondary"
                                                                    className="px-3 py-1 flex items-center gap-1"
                                                                >
                                                                    {email}
                                                                    <button
                                                                        className="ml-1 rounded-full hover:bg-gray-200 p-1"
                                                                        onClick={() => handleRemoveEmail(email)}
                                                                        aria-label={`Remove ${email}`}
                                                                    >
                                                                        <X className="h-3 w-3" />
                                                                    </button>
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {selectedRadio === "readers" && (
                                    <>
                                        {loading && (
                                            <div className="text-sm text-gray-500">Loading groups and readers...</div>
                                        )}

                                        {!loading && (
                                            filters.map((filter) => (
                                                <div key={filter.id}>
                                                    <GenericSelection
                                                        options={filter.options}
                                                        selectedValues={filter.selectedValues}
                                                        onChange={filter.onChange}
                                                        allLabel="All readers and groups"
                                                        searchPlaceholder="Search readers and groups..."
                                                        defaultAllSelected={false}
                                                        showAllAsOption={true}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <DialogFooter className={'flex-wrap'}>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-end w-full">

                        <Button variant="outline" onClick={() => setIsPublishModalOpen(false)}>
                            Close
                        </Button>
                        <Button
                            disabled={isPublishDisabled || pageCounter !== (mainStage.length - 1) || Object.values(imageLoadCounterPageWise).some((count) => count > 0)}
                            onClick={handlePublish}
                        >
                            {publishing ? <LoadingButton buttonLabel="Publishing" /> : pageCounter !== (mainStage.length - 1) || Object.values(imageLoadCounterPageWise).some((count) => count > 0) ? <LoadingButton buttonLabel="Preparing" /> : 'Publish Now'}
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-end w-full mt-2 hidden">

                        <Button
                            variant="secondary"
                            disabled={publishing || pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0)}
                            onClick={handleDownloadPDF}
                        >
                            {publishing ? <LoadingButton buttonLabel="Preparing PDF" /> : pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0) ? <LoadingButton buttonLabel="Preparing" /> : 'Download PDF'}
                        </Button>
                        <Button
                            variant="secondary"
                            disabled={publishing || pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0)}
                            onClick={handleDownloadZIP}
                        >
                            {publishing ? <LoadingButton buttonLabel="Preparing ZIP" /> : pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0) ? <LoadingButton buttonLabel="Preparing" /> : 'Download ZIP'}
                        </Button>
                        <Button
                            variant="secondary"
                            disabled={publishing || pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0)}
                            onClick={handleDownloadJSON}
                        >
                            {publishing ? <LoadingButton buttonLabel="Preparing JSON" /> : pageCounter !== mainStage.length || Object.values(imageLoadCounterPageWise).some((count) => count > 0) ? <LoadingButton buttonLabel="Preparing" /> : 'Download JSON'}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}