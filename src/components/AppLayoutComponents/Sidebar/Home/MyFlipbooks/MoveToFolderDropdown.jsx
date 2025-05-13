import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFolders } from "@/context/FolderContext";
import { MoveFlipbooksToFolderApi } from "@/service/folder.service";
import { Folder, FolderInput, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function MoveToFolderDropdown({ clearSelection, view, isFolder, selectedFlipbooks, setFlipbooks }) {
    const { getNormalFolders, getTemplateFolders } = useFolders();
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [movingFolderId, setMovingFolderId] = useState(null);
    const location = useLocation();
    const params = useParams();
    const dropdownTriggerRef = useRef(null);

    const folders = view === 'template' ? getTemplateFolders() : getNormalFolders();

    useEffect(() => {
        if (isFolder) {
            setSelectedFolderId(params.id);
        }
    }, [isFolder, params.id]);

    useEffect(() => {
        return () => {
            setSelectedFolderId(null);
            setIsMoving(false);
            setMovingFolderId(null);
        };
    }, [location.pathname]);

    const handleDropdownOpenChange = (open) => {
        setIsDropdownOpen(open);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleMoveToFolder = async (folderId) => {
        if (selectedFolderId === folderId) {
            return;
        }

        setIsMoving(true);
        setMovingFolderId(folderId);

        try {
            // Create the data object, excluding folderId for "personal"
            const data = {
                flipbookIds: selectedFlipbooks
            };
            
            // Only add folderId to payload if not moving to personal
            if (folderId !== 'personal') {
                data.folderId = folderId;
            }

            const response = await MoveFlipbooksToFolderApi(data);
            setFlipbooks(prev => prev.filter(item => !selectedFlipbooks.includes(item._id)));

            toast.success("Flipbooks moved", {
                description: response.message || `${selectedFlipbooks.length} flipbooks moved successfully`
            });
            closeDropdown();
            clearSelection();
        } catch (error) {
            toast.error("Failed to move flipbooks", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsMoving(false);
            setMovingFolderId(null);
        }
    };

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
            <DropdownMenuTrigger asChild ref={dropdownTriggerRef}>
                <Button
                    size="icon"
                    variant="ghost"
                    title="Move to folder"
                    aria-label="Move to folder"
                    disabled={isMoving}
                >
                    <FolderInput className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="right">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleMoveToFolder('personal');
                        }}
                        disabled={selectedFolderId === null || isMoving}
                        className={selectedFolderId === null ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        {isMoving && movingFolderId === 'personal' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : selectedFolderId === null ? (
                            <Folder fill="currentColor" className="mr-2 h-4 w-4" />
                        ) : (
                            <Folder className="mr-2 h-4 w-4" />
                        )}
                        {isMoving && movingFolderId === 'personal' ? 'Moving...' : 'Personal'}
                    </DropdownMenuItem>

                    {folders.map((folder) => (
                        <DropdownMenuItem
                            key={folder._id}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleMoveToFolder(folder._id);
                            }}
                            disabled={selectedFolderId === folder._id || isMoving}
                            className={selectedFolderId === folder._id ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {isMoving && movingFolderId === folder._id ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : selectedFolderId === folder._id ? (
                                <Folder fill="currentColor" className="mr-2 h-4 w-4" />
                            ) : (
                                <Folder className="mr-2 h-4 w-4" />
                            )}
                            {isMoving && movingFolderId === folder._id ? 'Moving...' : folder.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}