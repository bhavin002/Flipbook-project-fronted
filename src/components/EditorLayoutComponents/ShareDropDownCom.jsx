import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, Share, Share2, SlidersHorizontal } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublishFlipbookDialog from "../AppLayoutComponents/Sidebar/Home/MyFlipbooks/PublishFlipbookDialog";

export default function ShareDropDownCom() {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleItemClick = (action) => {
        if (action === "share") {
            setIsPublishModalOpen(true)
        } else if (action === "customize") {
            navigate("/customize/sd2112wdwd1d")
        }
    };

    return (
        <>
            <DropdownMenu className="hidden max-md:block">
                <DropdownMenuTrigger>
                    <Share2 />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleItemClick("share")}>
                            <Share2 /> Share now
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleItemClick("customize")}>
                            <SlidersHorizontal /> Customize
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Eye /> Preview
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <PublishFlipbookDialog
                isPublishModalOpen={isPublishModalOpen}
                setIsPublishModalOpen={setIsPublishModalOpen}
            />
        </>


    )
}