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
import { Globe, Lock, ListX, LockKeyhole, X, ChevronDown, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GenericSelection from "@/utils/GenericSelection";
import { GetWorkspaceGroupsApi } from "@/service/workspace.group.service";
import { GetFlipbookPublishInfoApi, UpdatePublishFlipbookApi } from "@/service/flipbook.publish.service"; // Import the new API
import { PublishFlipbookApi } from "@/service/flipbook.publish.service";
import { flipbookVisibility } from "@/utils/enum";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { useNavigate } from "react-router-dom";
import { UpdateFlipbookPageDataApi } from "@/service/flipbook.service";
import { LoadingOverlay } from "@/utils/Skeleton";
import { GetWorkspaceReadersApi } from "@/service/teammate.service";

export default function PublishFlipbookDialog({
    isPublishModalOpen,
    setIsPublishModalOpen,
    flipbookId, // Add flipbookId prop
    onPublishSuccess, // Optional callback for success handling
    mainStage,
    stageWidth,
    stageHeight,
    publishing,
    setPublishing
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
            .filter(reader => reader.isAccepted)
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
                .filter(reader => reader.isAccepted)
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

    // Handle publish action
    const handlePublish = async () => {
        if (!flipbookId) {
            console.error('FlipbookId is required for publishing');
            return;
        }

        setPublishing(true);

        try {

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
            await UpdateFlipbookPageDataApi(flipbookId, {
                width: stageWidth,
                height: stageHeight,
                pages: temp.map(e => ({
                    pageData: JSON.stringify(e),
                })),
            });

            const payload = buildPayload();
            // Generate thumbnails from mainStage
            const thumbnails = await generateThumbnails(mainStage);
            // Build FormData
            const formData = buildFormData(payload, thumbnails);
            // Call the API with FormData
            const response = isPublished
                ? await UpdatePublishFlipbookApi(formData)
                : await PublishFlipbookApi(formData);

            // Call success callback if provided
            if (onPublishSuccess) {
                onPublishSuccess(response);
            }

            // Close modal on success
            setIsPublishModalOpen(false);

            navigate(`/details/${flipbookId}`)

            // Reset form state
            resetForm();

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
                            <p className="text-sm font-medium text-gray-600 my-4">Your catalog will appear on your public Flipnova profile and it will be indexed
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
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPublishModalOpen(false)}>
                        Close
                    </Button>
                    <Button
                        disabled={isPublishDisabled}
                        onClick={handlePublish}
                    >
                        {publishing ? <LoadingButton /> : 'Publish Now'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}