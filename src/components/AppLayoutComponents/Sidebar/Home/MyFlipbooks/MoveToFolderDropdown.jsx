import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFolders } from "@/context/FolderContext";
import { Folder, FolderInput } from 'lucide-react';
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function MoveToFolderDropdown({ clearSelection, view, isFolder }) {
    const { getNormalFolders, getTemplateFolders } = useFolders();
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const location = useLocation();
    const params = useParams();

    const folders = view === 'template' ? getTemplateFolders() : getNormalFolders();

    useEffect(() => {
        if (isFolder) {
            setSelectedFolderId(params.id);
        }
    }, [isFolder, params.id]);

    useEffect(() => {
        return () => setSelectedFolderId(null);
    }, [location.pathname]);

    const handleMoveToFolder = (folderId) => {
        console.log(`Moving items to folder: ${folderId}`);
        clearSelection();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    title="Move to folder"
                    aria-label="Move to folder"
                >
                    <FolderInput className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="right">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => handleMoveToFolder('personal')}
                        disabled={selectedFolderId === null}
                        className={selectedFolderId === null ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        {selectedFolderId === null ? <Folder fill="currentColor" className="mr-2 h-4 w-4" /> : <Folder className="mr-2 h-4 w-4" />} Personal
                    </DropdownMenuItem>

                    {folders.map((folder) => (
                        <DropdownMenuItem
                            key={folder._id}
                            onClick={() => handleMoveToFolder(folder._id)}
                            disabled={selectedFolderId === folder._id}
                            className={selectedFolderId === folder._id ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {selectedFolderId === folder._id ? <Folder fill="currentColor" className="mr-2 h-4 w-4" /> : <Folder className="mr-2 h-4 w-4" />} {folder.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}