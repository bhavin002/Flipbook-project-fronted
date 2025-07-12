import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, LayoutPanelLeft, PencilOff, CopyPlus, PencilLine, Share2, Code, Link2, Download, ChartPie, ChartColumnIncreasing, SquareArrowRight, Trash, Send, Facebook, Twitter, Linkedin, Mail, Clock, Trash2 } from 'lucide-react';
import SaveAsTemplateDialog from "./SaveAsTemplateDialog";
import { useState } from "react";
import RenameFlipbookDialog from "./RenameFlipbookDialog";
import ShareFlipbookDialog from "./ShareFlipbookDialog";
import DownloadDialog from "./DownloadDialog";
import MoveToWorkspaceDialog from "./MoveToWorkspaceDialog";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import PublishFlipbookDialog from "./PublishFlipbookDialog";
import { useNavigate } from "react-router-dom";
import { MakeCopyOfFlipbookApi, MoveToTrashFlipbookApi, DeleteFlipbookApi, RecoverFlipbookApi } from "@/service/flipbook.service";
import { toast } from "sonner";
import { flipbookType } from "@/utils/enum";

export default function MyFlipbookDropdown({ status, flipbook, setFlipbooks, isTrash }) {
    const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isMoveToWorkspaceModalOpen, setIsMoveToWorkspaceModalOpen] = useState(false);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [isDeleteForeverModalOpen, setIsDeleteForeverModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const navigate = useNavigate();

    const handleDropdownOpenChange = (open) => {
        setIsDropdownOpen(open);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleItemClick = async (action, e) => {

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (action === 'saveAsTemplate') {
            setIsSaveAsTemplateModalOpen(true);
            closeDropdown();
        } else if (action === 'rename') {
            setIsRenameModalOpen(true);
            closeDropdown();
        } else if (action === 'share') {
            setIsShareModalOpen(true);
            closeDropdown();
        } else if (action === 'download') {
            setIsDownloadModalOpen(true);
            closeDropdown();
        } else if (action === 'moveToWorkspace') {
            setIsMoveToWorkspaceModalOpen(true);
            closeDropdown();
        } else if (action === 'trash') {
            setIsTrashModalOpen(true);
            closeDropdown();
        } else if (action === 'publish') {
            closeDropdown();
            navigate(`/editor/${flipbook._id}`, {
                state: {
                    publish: true
                }
            })
        } else if (action === "stats") {
            navigate(`/stats/${flipbook._id}`);
            closeDropdown();
        } else if (action === "embed") {
            navigate(`/embed/${flipbook._id}`);
            closeDropdown();
        } else if (action === "trackableLinks") {
            navigate(`/trackable-links/${flipbook._id}`);
            closeDropdown();
        } else if (action === "edit") {
            navigate(`/editor/${flipbook._id}`);
            closeDropdown();
        } else if (action === "use-template") {
            navigate(`/editor/${flipbook._id}`);
            closeDropdown();
        } else if (action === "makeCopy") {
            setIsCopying(true);
            try {
                const response = await MakeCopyOfFlipbookApi(flipbook._id);
                toast.success("Flipbook copied", {
                    description: response.message
                });
                setFlipbooks(prev => [response.data, ...prev]);
                closeDropdown();
            } catch (error) {
                toast.error("Failed to copy flipbook", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setIsCopying(false);
            }
        } else if (action === "recover") {
            setIsRecovering(true);
            try {
                const response = await RecoverFlipbookApi({
                    flipbookIds: [flipbook._id]
                });
                toast.success("Flipbook recovered", {
                    description: response.message || "The flipbook was successfully recovered"
                });
                setFlipbooks(prev => prev.filter(item => item._id !== flipbook._id));
                closeDropdown();
            } catch (error) {
                toast.error("Failed to recover flipbook", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setIsRecovering(false);
            }
        } else if (action === "deleteForever") {
            setIsDeleteForeverModalOpen(true);
            closeDropdown();
        } else {
            console.error("Invalid action:", action);
        }
    };

    const handleDeleteConfirmation = async (confirmed) => {
        if (confirmed) {
            setIsLoading(true);
            try {
                const response = await MoveToTrashFlipbookApi({
                    flipbookIds: [flipbook._id]
                });
                setFlipbooks(prev => prev.filter(item => item._id !== flipbook._id));
                toast.success("Flipbook moved to trash", {
                    description: response.message || "The flipbook was successfully moved to trash"
                });
                setIsTrashModalOpen(false);
            } catch (error) {
                toast.error("Failed to move flipbook to trash", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsTrashModalOpen(false);
        }
    };

    const handleDeleteForeverConfirmation = async (confirmed) => {
        if (confirmed) {
            setIsLoading(true);
            try {
                const response = await DeleteFlipbookApi({
                    flipbookIds: [flipbook._id]
                });
                setFlipbooks(prev => prev.filter(item => item._id !== flipbook._id));
                toast.success("Flipbook deleted permanently", {
                    description: response.message || "The flipbook was permanently deleted"
                });
                setIsDeleteForeverModalOpen(false);
            } catch (error) {
                toast.error("Failed to delete flipbook", {
                    description: error.message || "Something went wrong",
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsDeleteForeverModalOpen(false);
        }
    };

    const getMenuItems = () => {
        const publishedItems = (
            <>
                <DropdownMenuItem onClick={() => handleItemClick('edit')}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('saveAsTemplate')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Save as template
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={isCopying}
                    onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemClick('makeCopy', e);
                    }}
                >
                    <CopyPlus className="mr-2 h-4 w-4" /> {isCopying ? 'Making copy...' : 'Make a copy'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('rename')}>
                    <PencilLine className="mr-2 h-4 w-4" /> Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('share')}>
                    <Share2 className="mr-2 h-4 w-4" /> Sharing options
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('embed')}>
                    <Code className="mr-2 h-4 w-4" /> Embed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('trackableLinks')}>
                    <Link2 className="mr-2 h-4 w-4" /> Trackable links
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('download')}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('stats')}>
                    <ChartPie className="mr-2 h-4 w-4" /> Stats
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <ChartColumnIncreasing className="mr-2 h-4 w-4" /> Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('moveToWorkspace')}>
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('trash')}>
                    <Trash className="mr-2 h-4 w-4" /> Move to trash
                </DropdownMenuItem>
            </>
        );

        const draftItems = (
            <>
                <DropdownMenuItem onClick={() => handleItemClick('edit')}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <PencilOff className="mr-2 h-4 w-4" /> Cancel draft
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('saveAsTemplate')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Save as template
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={isCopying}
                    onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemClick('makeCopy', e);
                    }}
                >
                    <CopyPlus className="mr-2 h-4 w-4" /> {isCopying ? 'Making copy...' : 'Make a copy'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('rename')}>
                    <PencilLine className="mr-2 h-4 w-4" /> Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('share')}>
                    <Share2 className="mr-2 h-4 w-4" /> Sharing options
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('embed')}>
                    <Code className="mr-2 h-4 w-4" /> Embed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('trackableLinks')}>
                    <Link2 className="mr-2 h-4 w-4" /> Trackable links
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('download')}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('stats')}>
                    <ChartPie className="mr-2 h-4 w-4" /> Stats
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <ChartColumnIncreasing className="mr-2 h-4 w-4" /> Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('moveToWorkspace')}>
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('trash')}>
                    <Trash className="mr-2 h-4 w-4" /> Move to trash
                </DropdownMenuItem>
            </>
        );

        const unpublishedItems = (
            <>
                <DropdownMenuItem onClick={() => handleItemClick('publish')}>
                    <Send className="mr-2 h-4 w-4" /> Publish
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('edit')}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('saveAsTemplate')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Save as template
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={isCopying}
                    onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemClick('makeCopy', e);
                    }}
                >
                    <CopyPlus className="mr-2 h-4 w-4" /> {isCopying ? 'Making copy...' : 'Make a copy'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('rename')}>
                    <PencilLine className="mr-2 h-4 w-4" /> Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('moveToWorkspace')}>
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('trash')}>
                    <Trash className="mr-2 h-4 w-4" /> Move to trash
                </DropdownMenuItem>
            </>
        );

        const templateItems = (
            <>
                <DropdownMenuItem onClick={() => handleItemClick('use-template')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Use template
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('edit')}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    disabled={isCopying}
                    onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemClick('makeCopy', e);
                    }}
                >
                    <CopyPlus className="mr-2 h-4 w-4" /> {isCopying ? 'Making copy...' : 'Make a copy'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('rename')}>
                    <PencilLine className="mr-2 h-4 w-4" /> Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('trash')}>
                    <Trash className="mr-2 h-4 w-4" /> Move to trash
                </DropdownMenuItem>
            </>
        );

        const deletedItems = (
            <>
                <DropdownMenuItem
                    disabled={isRecovering}
                    onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemClick('recover', e);
                    }}
                >
                    <Clock className="mr-2 h-4 w-4" /> {isRecovering ? 'Recovering...' : 'Recover'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('deleteForever')}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete forever
                </DropdownMenuItem>
            </>
        );

        if (isTrash) {
            return (
                <>
                    {deletedItems}
                </>
            )
        } else {
            switch (status) {
                case 'draft':
                    return (
                        <>
                            {draftItems}
                        </>
                    );
                case 'published':
                    return (
                        <>
                            {publishedItems}
                        </>
                    );
                case 'unpublished':
                    return (
                        <>
                            {unpublishedItems}
                        </>
                    );
                case 'template':
                    return (
                        <>
                            {templateItems}
                        </>
                    );
                default:
                    return unpublishedItems;
            }
        }
    };

    return (
        <>
            <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
                <DropdownMenuTrigger asChild>
                    <button className='absolute top-3 right-3 bg-primary p-1.5 rounded-full shadow-sm cursor-pointer text-white hover:scale-110 transition-all duration-200'>
                        <EllipsisVertical className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        {getMenuItems()}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <SaveAsTemplateDialog isSaveAsTemplateModalOpen={isSaveAsTemplateModalOpen} setIsSaveAsTemplateModalOpen={setIsSaveAsTemplateModalOpen} flipbook={flipbook} />
            <RenameFlipbookDialog isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen} flipbook={flipbook} setFlipbooks={setFlipbooks} />
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} flipbookId={flipbook._id}/>
            <DownloadDialog isDownloadModalOpen={isDownloadModalOpen} setIsDownloadModalOpen={setIsDownloadModalOpen} />
            <MoveToWorkspaceDialog isMoveToWorkspaceModalOpen={isMoveToWorkspaceModalOpen} setIsMoveToWorkspaceModalOpen={setIsMoveToWorkspaceModalOpen} flipbookId={flipbook._id} setFlipbooks={setFlipbooks} />
            <ConfirmationDialog
                isConfirmModalOpen={isTrashModalOpen}
                setIsConfirmModalOpen={setIsTrashModalOpen}
                title="Move to Trash"
                description={`Are you sure you want to move "${flipbook.name}" ${flipbook.flipbookType === flipbookType.TEMPLATE ? 'template' : 'flipbook'}  to Trash?`}
                isLoading={isLoading}
                onConfirm={() => handleDeleteConfirmation(true)}
                onCancel={() => handleDeleteConfirmation(false)}
            />
            <ConfirmationDialog
                isConfirmModalOpen={isDeleteForeverModalOpen}
                setIsConfirmModalOpen={setIsDeleteForeverModalOpen}
                title="Delete Forever"
                description={`Are you sure you want to permanently delete "${flipbook.name}" ${flipbook.flipbookType === flipbookType.TEMPLATE ? 'template' : 'flipbook'}? This action cannot be undone.`}
                isLoading={isLoading}
                onConfirm={() => handleDeleteForeverConfirmation(true)}
                onCancel={() => handleDeleteForeverConfirmation(false)}
            />
        </>
    );
}