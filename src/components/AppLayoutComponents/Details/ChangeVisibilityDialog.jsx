import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Lock, ListX, LockKeyhole, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import GenericSelection from "@/utils/GenericSelection";
import { GetWorkspaceGroupsApi } from "@/service/workspace.group.service";
import { GetFlipbookPublishInfoApi, UpdateFlipbookDetailsApi } from "@/service/flipbook.publish.service";
import { flipbookVisibility } from "@/utils/enum";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";
import { LoadingOverlay } from "@/utils/Skeleton";
import { GetWorkspaceReadersApi } from "@/service/teammate.service";

export default function ChangeVisibilityDialog({ open, setOpen, flipbookId, setFlipbookDetails }) {
    const [selectedRadio, setSelectedRadio] = useState("email");
    const [emailInput, setEmailInput] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const [addedEmails, setAddedEmails] = useState([]);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("public");
    const [groups, setGroups] = useState([]);
    const [readers, setReaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (open && flipbookId) {
            fetchInitialData();
        }
        // eslint-disable-next-line
    }, [open, flipbookId]);

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
            const { publishFlipbookData, isPublished } = publishInfoResponse.data;
            if (isPublished && publishFlipbookData) {
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
                    setAddedEmails(publishFlipbookData.privateEmails || []);
                } else if (visibility === flipbookVisibility.READERS_ONLY) {
                    setActiveTab("private");
                    setSelectedRadio("readers");
                    if (publishFlipbookData.allReaderGroups) {
                        setCreatedByFilter(["All readers and groups"]);
                    } else {
                        const selectedLabels = [];
                        (publishFlipbookData.readerIds || []).forEach(readerId => {
                            const reader = readersResponse.data.find(r => r._id === readerId);
                            if (reader) selectedLabels.push(reader.name || reader.email);
                        });
                        (publishFlipbookData.readerGroupIds || []).forEach(groupId => {
                            const group = groupsResponse.data.find(g => g._id === groupId);
                            if (group) selectedLabels.push(group.name);
                        });
                        setCreatedByFilter(selectedLabels);
                    }
                }
            } else {
                setActiveTab("public");
                setSelectedRadio("email");
                setAddedEmails([]);
                setCreatedByFilter([]);
                setPassword("");
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

    const transformDataForGenericSelection = () => {
        const transformedGroups = groups.map(group => ({
            value: group._id,
            label: group.name
        }));
        const transformedReaders = readers.filter(reader => reader.status).map(reader => ({
            value: reader._id,
            label: reader.name || reader.email
        }));
        return [
            { name: "Groups", groups: transformedGroups },
            { name: "Readers", readers: transformedReaders }
        ];
    };

    const isAllSelected = () => createdByFilter.includes("All readers and groups");

    const getSelectedIds = () => {
        if (isAllSelected()) {
            const allReaderIds = readers.filter(reader => reader.status).map(reader => reader._id);
            const allGroupIds = groups.map(group => group._id);
            return { readerIds: allReaderIds, groupIds: allGroupIds };
        }
        const readerIds = [];
        const groupIds = [];
        createdByFilter.forEach(selectedLabel => {
            if (selectedLabel === "All readers and groups") return;
            const reader = readers.find(r => (r.name || r.email) === selectedLabel);
            if (reader) {
                readerIds.push(reader._id);
                return;
            }
            const group = groups.find(g => g.name === selectedLabel);
            if (group) groupIds.push(group._id);
        });
        return { readerIds, groupIds };
    };

    const buildPayload = () => {
        const basePayload = { flipbookId };
        switch (activeTab) {
            case "public":
                return { ...basePayload, visibility: flipbookVisibility.PUBLIC, isVisible: true };
            case "unlisted":
                return { ...basePayload, visibility: flipbookVisibility.PUBLIC, isVisible: false };
            case "passwordLocked":
                return { ...basePayload, visibility: flipbookVisibility.PASSWORD, password: password.trim() };
            case "private":
                if (selectedRadio === "email") {
                    return { ...basePayload, visibility: flipbookVisibility.PRIVATE, privateEmails: addedEmails };
                } else {
                    const { readerIds, groupIds } = getSelectedIds();
                    return {
                        ...basePayload,
                        visibility: flipbookVisibility.READERS_ONLY,
                        readerIds,
                        readerGroupIds: groupIds,
                        allReaderGroups: isAllSelected()
                    };
                }
            default:
                return basePayload;
        }
    };

    const handleSave = async () => {
        try {
            setIsUpdating(true);
            const payload = buildPayload();
            const response = await UpdateFlipbookDetailsApi(payload);
            toast.success("Visibility updated successfully");
            setOpen(false);
            if (setFlipbookDetails) setFlipbookDetails(response.data);
        } catch (err) {
            toast.error("Failed to update visibility", { description: err.message || "Something went wrong." });
        } finally {
            setIsUpdating(false);
        }
    };

    const filters = [
        {
            id: 'createdBy',
            options: transformDataForGenericSelection(),
            selectedValues: createdByFilter,
            onChange: setCreatedByFilter
        }
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                {loading && <LoadingOverlay />}
                <DialogHeader>
                    <DialogTitle>Change visibility</DialogTitle>
                    <DialogDescription className="sr-only">Description</DialogDescription>
                </DialogHeader>
               
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
                        <p className="text-sm font-medium text-gray-600 my-4">Your catalog will appear on your public Flipnova profile and it will be indexed by the search engines (Google, Bing, etc).</p>
                    </TabsContent>
                    <TabsContent value="unlisted">
                        <p className="text-sm font-medium text-gray-600 my-4">Your catalog will not appear anywhere on the web. Only people you personally share the direct link with will have access to your catalog.</p>
                    </TabsContent>
                    <TabsContent value="passwordLocked">
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <Input id="password" placeholder="Enter password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web. Your readers must enter the password you have set in order to read your flipbook.</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="private">
                        <div className="space-y-4 my-4">
                            <RadioGroup className="flex" value={selectedRadio} onValueChange={handleRadioChange}>
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
                                        <Input placeholder="Enter email addresses" className={`flex-grow ${!isEmailValid && emailInput ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`} value={emailInput} onChange={handleEmailChange} onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddEmail(); } }} />
                                        <Button onClick={handleAddEmail}>Add email</Button>
                                    </div>
                                    {addedEmails.length > 0 && (
                                        <div className="space-y-2">
                                            <Label>Who has access</Label>
                                            <div className="border rounded-md p-3 bg-gray-50">
                                                <ScrollArea className="max-h-24 overflow-auto">
                                                    <div className="flex flex-wrap gap-2">
                                                        {addedEmails.map((email, index) => (
                                                            <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                                                                {email}
                                                                <button className="ml-1 rounded-full hover:bg-gray-200 p-1" onClick={() => handleRemoveEmail(email)} aria-label={`Remove ${email}`}>
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
                                filters.map((filter) => (
                                    <GenericSelection key={filter.id} options={filter.options} selectedValues={filter.selectedValues} onChange={filter.onChange} allLabel="All readers and groups" searchPlaceholder="Search readers and groups..." defaultAllSelected={false} showAllAsOption={true} />
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isUpdating}>{isUpdating ? <LoadingButton /> : "Save changes"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}