import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, LayoutPanelLeft, PencilOff, CopyPlus, PencilLine, Share2, Code, Link2, Download, ChartPie, ChartColumnIncreasing, SquareArrowRight, Trash, Send, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import SaveAsTemplateDialog from "./SaveAsTemplateDialog";
import { useState } from "react";
import RenameFlipbookDialog from "./RenameFlipbookDialog";
import ShareFlipbookDialog from "./ShareFlipbookDialog";
import DownloadDialog from "./DownloadDialog";
import MoveToWorkspaceDialog from "./MoveToWorkspaceDialog";
import ConfirmationDialog from "@/utils/ConfirmationDialog";
import PublishFlipbookDialog from "./PublishFlipbookDialog";
import { useNavigate } from "react-router-dom";

export default function MyFlipbookDropdown({ status }) {
    const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isMoveToWorkspaceModalOpen, setIsMoveToWorkspaceModalOpen] = useState(false);
    const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleItemClick = (action) => {
        if (action === 'saveAsTemplate') {
            setIsSaveAsTemplateModalOpen(true);
        } else if (action === 'rename') {
            setIsRenameModalOpen(true);
        } else if (action === 'share') {
            setIsShareModalOpen(true);
        } else if (action === 'download') {
            setIsDownloadModalOpen(true);
        } else if (action === 'moveToWorkspace') {
            setIsMoveToWorkspaceModalOpen(true);
        } else if (action === 'trash') {
            setIsTrashModalOpen(true);
        } else if (action === 'publish') {
            setIsPublishModalOpen(true);
        }else if (action === "stats"){
            navigate("/stats/sd2112wdwd1d")
        }else if (action === "embed"){
            navigate("/embed/sd2112wdwd1d")
        }else if (action === "trackableLinks"){
            navigate("/trackable-links/sd2112wdwd1d")
        } else {
            console.error("Invalid action:", action);
        }
    };

    const getMenuItems = () => {
        const publishedItems = (
            <>
                <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleItemClick('saveAsTemplate')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Save as template
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <CopyPlus className="mr-2 h-4 w-4" /> Make a copy
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
                <DropdownMenuItem>
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
                <DropdownMenuItem >
                    <CopyPlus className="mr-2 h-4 w-4" /> Make a copy
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
                <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleItemClick('saveAsTemplate')}>
                    <LayoutPanelLeft className="mr-2 h-4 w-4" /> Save as template
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <CopyPlus className="mr-2 h-4 w-4" /> Make a copy
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
            default:
                return unpublishedItems;
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className='absolute top-3 right-3 bg-white/50 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-violet-50/50 hover:scale-110 transition-all duration-200 hover:text-violet-700'>
                        <EllipsisVertical className="w-4 h-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        {getMenuItems()}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <SaveAsTemplateDialog isSaveAsTemplateModalOpen={isSaveAsTemplateModalOpen} setIsSaveAsTemplateModalOpen={setIsSaveAsTemplateModalOpen} />
            <RenameFlipbookDialog isRenameModalOpen={isRenameModalOpen} setIsRenameModalOpen={setIsRenameModalOpen} />
            <ShareFlipbookDialog isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
            <DownloadDialog isDownloadModalOpen={isDownloadModalOpen} setIsDownloadModalOpen={setIsDownloadModalOpen} />
            <MoveToWorkspaceDialog isMoveToWorkspaceModalOpen={isMoveToWorkspaceModalOpen} setIsMoveToWorkspaceModalOpen={setIsMoveToWorkspaceModalOpen} />
            <ConfirmationDialog
                isConfirmModalOpen={isTrashModalOpen}
                setIsConfirmModalOpen={setIsTrashModalOpen}
                title="Move to Trash"
                description="Are you sure you want to move this flipbook to Trash?"
            />
            <PublishFlipbookDialog isPublishModalOpen={isPublishModalOpen} setIsPublishModalOpen={setIsPublishModalOpen} />
        </>
    );
}