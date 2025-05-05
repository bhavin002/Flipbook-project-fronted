import * as React from "react";
import { useState, useRef } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, Trash2, Ellipsis, Link2, FolderSymlink, Download, ChevronRight, Folder } from 'lucide-react';
import { CopyMediaFileToWorkspaceApi, DeleteMediaFilesApi, GeneratePresignedUrlApi, MoveToFolderApi } from "@/service/mediaFiles.service";
import { toast } from "sonner";
import ConfirmationDialog from "@/utils/ConfirmationDialog";

export default function MediaImageDropDownCom({
    onOpenChange,
    mediaFile,
    folders = [],
    currentFolderId,
    currentView,
    selectedFolder,
    setMediaFiles,
    setSelectedFolderMedia,
    isTeamMedia = false
}) {
    const [isMoveSubmenuOpen, setIsMoveSubmenuOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    
    const mainDropdownTriggerRef = useRef(null);

    const handleMainDropdownOpenChange = (open) => {
        setIsMainDropdownOpen(open);
        if (onOpenChange) {
            onOpenChange(open);
        }
    };

    const closeMainDropdown = () => {
        setIsMainDropdownOpen(false);
        if (onOpenChange) {
            onOpenChange(false);
        }
    };

    const getTruncatedFilename = (filename) => {
        if (!filename) return "Unnamed file";
        return filename.length > 20 ? filename.substring(0, 17) + "..." : filename;
    };

    const handleCopyLink = () => {
        if (mediaFile?.url) {
            navigator.clipboard.writeText(mediaFile.url)
                .then(() => {
                    toast.success("Link copied", {
                        description: "Copied to clipboard"
                    });
                    closeMainDropdown();
                })
                .catch(() => {
                    toast.error("Failed to copy link", {
                        description: "Failed to copy link"
                    });
                });
        }
    };

    const handleDownload = async (mediaId, fileName) => {
        try {
            setIsDownloading(true);
            const response = await GeneratePresignedUrlApi(mediaId);
            const presignedUrl = response.data.presignedUrl;
            if (!presignedUrl) {
                throw new Error("Presigned URL not received");
            }

            const fileResponse = await fetch(presignedUrl);
            if (!fileResponse.ok) {
                throw new Error("Failed to fetch file");
            }

            const blob = await fileResponse.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName || "downloaded-file";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);
            
            closeMainDropdown();

        } catch (error) {
            toast.error("Failed to download file", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const confirmDelete = () => {
        setIsDeleteConfirmOpen(true);
    };

    const handleDelete = async () => {
        setIsDeleteLoading(true);
        try {
            const response = await DeleteMediaFilesApi({
                folderId: currentFolderId,
                fileIds: [mediaFile._id]
            });

            if (currentView === 'main') {
                setMediaFiles(prevFiles =>
                    prevFiles.filter(file => file._id !== mediaFile._id)
                );
            } else if (currentView === 'folder') {
                setSelectedFolderMedia(prevFiles =>
                    prevFiles.filter(file => file._id !== mediaFile._id)
                );
            }

            toast.success("File deleted", {
                description: response.message || "File successfully deleted"
            });
            
            closeMainDropdown();
        } catch (error) {
            toast.error("Failed to delete file", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setIsDeleteLoading(false);
            setIsDeleteConfirmOpen(false);
        }
    };

    const handleCopyToTeam = async () => {
        setIsCopying(true);
        try {
            const response = await CopyMediaFileToWorkspaceApi({
                folderId: currentFolderId,
                fileIds: [mediaFile._id]
            });

            toast.success('Media copied', {
                description: response.message || 'Media successfully copied to team'
            });
            
            closeMainDropdown();
        } catch (error) {
            toast.error('Failed to copy media', {
                description: error.message || 'Something went wrong'
            });
        } finally {
            setIsCopying(false);
        }
    };

    const handleMoveToFolder = async (folderId) => {
        try {
            const response = await MoveToFolderApi({
                sourceFolderId: currentFolderId,
                destinationFolderId: folderId,
                fileIds: [mediaFile._id]
            });

            if (currentView === 'main') {
                setMediaFiles(prevFiles =>
                    prevFiles.filter(file => file._id !== mediaFile._id)
                );
            } else if (currentView === 'folder') {
                setSelectedFolderMedia(prevFiles =>
                    prevFiles.filter(file => file._id !== mediaFile._id)
                );
            }

            toast.success("File moved", {
                description: response.message || "File successfully moved"
            });
            
            setIsMoveSubmenuOpen(false);
            closeMainDropdown();
        } catch (error) {
            toast.error("Failed to move file", {
                description: error.message || "Something went wrong"
            });
        }
    };

    const MoveToSubmenu = () => {
        return (
            <DropdownMenu open={isMoveSubmenuOpen} onOpenChange={setIsMoveSubmenuOpen}>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <FolderSymlink className="mr-2 h-4 w-4" />
                            <span>Move to</span>
                        </div>
                        <ChevronRight className="ml-2 w-4 h-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-[200px]" align="start" side="right">
                    <DropdownMenuGroup>
                        {folders.map((folder, index) => {
                            const isSelected = (currentView === 'folder' && selectedFolder && folder._id === selectedFolder._id) ||
                                (currentView === 'main' && folder.byDefault);
                            return (
                                <DropdownMenuItem
                                    key={index}
                                    disabled={isSelected}
                                    onSelect={() => !isSelected && handleMoveToFolder(folder._id)}
                                >
                                    {isSelected ?
                                        <Folder fill="currentColor" className="mr-2 h-4 w-4" /> :
                                        <Folder className="mr-2 h-4 w-4" />
                                    }
                                    {folder.name}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <>
            <DropdownMenu open={isMainDropdownOpen} onOpenChange={handleMainDropdownOpenChange}>
                <DropdownMenuTrigger ref={mainDropdownTriggerRef} className="absolute top-1 right-1 text-center bg-black bg-opacity-70 text-white px-1.5 rounded-[12px] text-xs font-medium">
                    <Ellipsis className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span>{getTruncatedFilename(mediaFile?.fileName)}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {!isTeamMedia && (
                            <DropdownMenuItem
                                disabled={isCopying}
                                onSelect={(e) => {
                                    e.preventDefault();
                                    handleCopyToTeam();
                                }}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                <span>{isCopying ? 'Copying...' : 'Copy to my team'}</span>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                handleCopyLink();
                            }}
                        >
                            <Link2 className="mr-2 h-4 w-4" />
                            <span>Copy link</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <MoveToSubmenu />
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            disabled={isDownloading}
                            onSelect={(e) => {
                                e.preventDefault();
                                handleDownload(mediaFile._id, mediaFile.fileName);
                            }}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            {isDownloading ? 'Downloading...' : 'Download original'}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                confirmDelete();
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteConfirmOpen}
                setIsConfirmModalOpen={setIsDeleteConfirmOpen}
                title="Delete Media File"
                description="Are you sure you want to delete this file? This action cannot be undone."
                onConfirm={handleDelete}
                isLoading={isDeleteLoading}
            />
        </>
    );
}