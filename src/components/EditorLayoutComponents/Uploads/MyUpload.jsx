import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Folder, FolderPlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FolderDropDownCom from "./FolderDropDownCom";
import { GetMediaFoldersApi, GetMediaInFolderApi } from "@/service/mediaFolder.service";
import CreateMediaFolderDialog from "./CreateMediaFolderDialog";
import { toast } from "sonner";
import { MediaFolderSkeleton } from "@/utils/Skeleton";
import { UploadMultipleMediaFilesApi } from "@/service/mediaFiles.service";
import UploadSection from "./UploadSection";

export default function MyUpload() {
    const fileInputRef = useRef(null);
    const [showAllFolders, setShowAllFolders] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [folders, setFolders] = useState([]);
    const [currentView, setCurrentView] = useState('main');
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedFolderMedia, setSelectedFolderMedia] = useState([]);

    const getFolders = async () => {
        setIsLoading(true);
        try {
            const response = await GetMediaFoldersApi();
            setFolders(response.data);

            const defaultFolder = response.data.find(folder => folder.byDefault);
            console.log("defaultFolder ??", defaultFolder)

            if (defaultFolder) {
                setMediaFiles(defaultFolder.media || []);
            }
        } catch (error) {
            toast.error("Media folder fetch failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFolders();
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setIsUploading(true);

            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            try {
                const folderId = currentView === 'main' ? folders.find(folder => folder.byDefault)?._id : selectedFolder?._id;

                if (!folderId) {
                    return;
                }

                const response = await UploadMultipleMediaFilesApi(folderId, formData);

                if (currentView === 'main') {
                    const defaultFolder = folders.find(folder => folder.byDefault);
                    if (defaultFolder) {
                        setMediaFiles([...defaultFolder.media, ...response.data]);
                    }
                } else {
                    setSelectedFolderMedia([...selectedFolderMedia, ...response.data]);
                }
            } catch (error) {
                toast.error("Upload failed", {
                    description: error.message || "Oops! Something went wrong during upload.",
                });
            } finally {
                setIsUploading(false);
            }
        }
    };

    const nonDefaultFolders = folders.filter(folder => !folder.byDefault);
    const displayedFolders = showAllFolders ? nonDefaultFolders : nonDefaultFolders.slice(0, 6);

    const handleDropdownOpen = (index) => {
        setActiveDropdownIndex(index);
    };

    const handleDropdownClose = () => {
        setActiveDropdownIndex(null);
    };

    const handleFolderRenamed = (updatedFolder) => {
        setFolders(prevFolders =>
            prevFolders.map(folder =>
                folder._id === updatedFolder._id ? updatedFolder : folder
            )
        );
    };

    const handleFolderDeleted = (folderId) => {
        setFolders(prevFolders =>
            prevFolders.filter(folder => folder._id !== folderId)
        );
    };

    const handleOpenFolder = async (folder) => {
        try {
            const response = await GetMediaInFolderApi(folder._id);
            setSelectedFolderMedia(response.data || []);
            setSelectedFolder(folder);
            setCurrentView('folder');
        } catch (error) {
            toast.error("Failed to open folder", {
                description: error.message || "Something went wrong",
            });
        }
    };

    const handleBackClick = async () => {
        try {
            const defaultFolderId = folders.find(folder => folder.byDefault)?._id;
            if (defaultFolderId) {
                const mediaResponse = await GetMediaInFolderApi(defaultFolderId);
                setMediaFiles(mediaResponse.data || []);
            }
            setCurrentView('main');
            setSelectedFolder(null);
        } catch (error) {
            toast.error("Error returning to main view", {
                description: error.message || "Something went wrong",
            });
        }
    };

    const renderFolderView = () => (
        <div className="flex flex-col flex-grow overflow-y-auto h-0">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary hover:text-white"
                    onClick={handleBackClick}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <span className="font-semibold">{selectedFolder?.name}</span>
            </div>

            <UploadSection 
                mediaFiles={selectedFolderMedia}
                folders={folders}
            />
        </div>
    );

    const renderMainView = () => (
        <>
            <div className="space-y-2">
                <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">Folders</span>
                    <div
                        className="w-8 h-8 hover:bg-primary flex items-center justify-center rounded-sm cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsCreateFolderModalOpen(true);
                        }}
                    >
                        <FolderPlus className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="max-h-48 overflow-y-auto">
                        {isLoading ? (
                            <MediaFolderSkeleton />
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {displayedFolders.length === 0 ? (
                                    <div className="col-span-3 text-white text-xs py-2 px-3 text-center">
                                        No folders found
                                    </div>
                                ) : (
                                    displayedFolders.map((folder, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="cursor-pointer flex flex-col items-center"
                                            onMouseEnter={() => setHoveredIndex(itemIndex)}
                                            onMouseLeave={() => {
                                                if (activeDropdownIndex !== itemIndex) {
                                                    setHoveredIndex(null);
                                                }
                                            }}
                                            onClick={(e) => {
                                                if (e.currentTarget === e.target || e.target.tagName === 'SPAN') {
                                                    handleOpenFolder(folder);
                                                }
                                            }}
                                        >
                                            <div className="rounded-lg w-full bg-primary hover:bg-violet-700 flex gap-2 px-1 py-1 items-center">
                                                {hoveredIndex === itemIndex || activeDropdownIndex === itemIndex ? (
                                                    <FolderDropDownCom
                                                        folder={folder}
                                                        onFolderRenamed={handleFolderRenamed}
                                                        onFolderDeleted={handleFolderDeleted}
                                                        onFolderOpen={handleOpenFolder}
                                                        onOpenChange={(open) => {
                                                            if (open) {
                                                                handleDropdownOpen(itemIndex);
                                                            } else {
                                                                handleDropdownClose();
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="p-1">
                                                        <Folder className="w-4 h-4" />
                                                    </div>
                                                )}
                                                <span className="text-xs truncate">{folder.name}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                    {!isLoading && nonDefaultFolders.length > 6 && (
                        <p className="text-xs mt-2 font-medium text-white cursor-pointer hover:underline"
                            onClick={() => setShowAllFolders(!showAllFolders)}
                        >
                            {showAllFolders ? "Show Less" : "Show More"}
                        </p>
                    )}
                </div>
            </div>
            
            <UploadSection 
                mediaFiles={mediaFiles}
                folders={folders}
            />
        </>
    );

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4"
            />

            <Button
                className="w-full text-black hover:text-primary flex gap-2 items-center"
                variant="outline"
                onClick={handleUploadClick}
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Upload media'}
                <Upload className="w-4 h-4" />
            </Button>

            <div className="space-y-2 flex-grow overflow-y-auto h-0 flex flex-col">
                {currentView === 'main' ? renderMainView() : renderFolderView()}
            </div>

            <CreateMediaFolderDialog
                isCreateFolderModalOpen={isCreateFolderModalOpen}
                setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
                onFolderCreated={(folder) => {
                    setFolders(prevFolders => [...prevFolders, folder]);
                }}
                scope="personal"
            />
        </>
    );
}