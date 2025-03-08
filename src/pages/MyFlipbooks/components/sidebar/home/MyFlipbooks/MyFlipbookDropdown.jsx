import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, LayoutPanelLeft, PencilOff, CopyPlus, PencilLine, Share2, Code, Link2, Download, ChartPie, ChartColumnIncreasing, SquareArrowRight, Trash, Send } from 'lucide-react';
import SaveAsTemplateDialog from "./SaveAsTemplateDialog";
import { useState } from "react";
import RenameFlipbookDialog from "./RenameFlipbookDialog";

export default function MyFlipbookDropdown({ status }) {
    const [isSaveAsTemplateModalOpen, setIsSaveAsTemplateModalOpen] = useState(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

    const handleItemClick = (action) => {
        if (action === 'saveAsTemplate') {
            setIsSaveAsTemplateModalOpen(true);
        } else if (action === 'rename') {
            setIsRenameModalOpen(true);
        }
        else {
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
                <DropdownMenuItem >
                    <Share2 className="mr-2 h-4 w-4" /> Sharing options
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Code className="mr-2 h-4 w-4" /> Embed
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Link2 className="mr-2 h-4 w-4" /> Trackable links
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Download className="mr-2 h-4 w-4" /> Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <ChartPie className="mr-2 h-4 w-4" /> Stats
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <ChartColumnIncreasing className="mr-2 h-4 w-4" /> Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem >
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
                    <PencilOff className="mr-2 h-4 w-4" /> Cancle draft
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
                <DropdownMenuItem >
                    <Share2 className="mr-2 h-4 w-4" /> Sharing options
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Code className="mr-2 h-4 w-4" /> Embed
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Link2 className="mr-2 h-4 w-4" /> Trackable links
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Download className="mr-2 h-4 w-4" /> Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <ChartPie className="mr-2 h-4 w-4" /> Stats
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <ChartColumnIncreasing className="mr-2 h-4 w-4" /> Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <Trash className="mr-2 h-4 w-4" /> Move to trash
                </DropdownMenuItem>
            </>
        );

        const unpublishedItems = (
            <>
                <DropdownMenuItem>
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
                <DropdownMenuItem >
                    <SquareArrowRight className="mr-2 h-4 w-4" /> Move to workspace
                </DropdownMenuItem>
                <DropdownMenuItem >
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
        </>
    );
}