import { useState, useEffect } from 'react';
import { getTrashedFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { getTrashedFoldersApi, RecoverWorkspaceFolderApi, DeleteWorkspaceFolderApi } from '@/service/folder.service';
import { Clock, Folder, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationDialog from '@/utils/ConfirmationDialog';
import { triggerSidebarRefresh } from '@/components/AppLayoutComponents/Sidebar/Home/HomeSidebarPanel';
import ZeroState from '@/utils/ZeroState';

export const refreshTrashEvent = new CustomEvent('refreshTrash');

export function triggerTrashRefresh() {
    window.dispatchEvent(refreshTrashEvent);
}

export default function Trash({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const [folders, setFolders] = useState([]);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [processingFolderIds, setProcessingFolderIds] = useState({});

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [flipbooksResponse, foldersResponse] = await Promise.all([
                getTrashedFlipbooksApi(),
                getTrashedFoldersApi()
            ]);

            setFlipbooks(flipbooksResponse.data);
            setFolders(foldersResponse.data);
        } catch (error) {
            toast.error("Data fetch failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleRefreshEvent = () => {
            setRefreshCounter(prev => prev + 1);
        };

        window.addEventListener('refreshTrash', handleRefreshEvent);

        return () => {
            window.removeEventListener('refreshTrash', handleRefreshEvent);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, [refreshCounter]);

    const handleDeleteClick = (folder) => {
        setSelectedFolder(folder);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedFolder) return;

        setProcessingFolderIds(prev => ({
            ...prev,
            [selectedFolder._id]: 'deleting'
        }));

        try {
            await DeleteWorkspaceFolderApi(selectedFolder._id);
            toast.success("Folder deleted permanently", {
                description: "The folder has been permanently removed"
            });
            setFolders(prev => prev.filter(folder => folder._id !== selectedFolder._id));
        } catch (error) {
            toast.error("Failed to delete folder", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setProcessingFolderIds(prev => {
                const updated = { ...prev };
                delete updated[selectedFolder._id];
                return updated;
            });
            setIsDeleteModalOpen(false);
            setSelectedFolder(null);
        }
    };

    const handleRecoverClick = async (folder) => {
        setProcessingFolderIds(prev => ({
            ...prev,
            [folder._id]: 'recovering'
        }));

        try {
            await RecoverWorkspaceFolderApi(folder._id);
            toast.success("Folder recovered", {
                description: "The folder has been successfully restored"
            });
            setFolders(prev => prev.filter(f => f._id !== folder._id));

            triggerSidebarRefresh();
        } catch (error) {
            toast.error("Failed to recover folder", {
                description: error.message || "Something went wrong"
            });
        } finally {
            setProcessingFolderIds(prev => {
                const updated = { ...prev };
                delete updated[folder._id];
                return updated;
            });
        }
    };

    const isProcessing = (folderId) => {
        return !!processingFolderIds[folderId];
    };

    const getButtonState = (folderId, action) => {
        const status = processingFolderIds[folderId];
        if (!status) return false;
        return status === action;
    };

    if (flipbooks.length === 0 && folders.length === 0) {
        return (
            <ZeroState
                title="Folder is empty"
                description="Get started on your first flipbook – just click the button below!"
            />
        );
    }

    return (
        <>
            {folders.length > 0 && (
                <div className="flex flex-wrap gap-4 px-6 pt-6">
                    {folders.map((folder) => (
                        <div
                            key={folder._id}
                            className="w-64 rounded-lg border flex gap-2 px-2 items-center"
                        >
                            <div className="flex items-center gap-2 p-1 w-full">
                                <Folder fill="#6d28d9" color="#6d28d9" className="w-5 h-5" />
                                <div className="truncate flex-1">
                                    <h3 className="font-medium text-gray-800 truncate">{folder.name}</h3>
                                </div>
                                <div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        title="Recover"
                                        onClick={() => handleRecoverClick(folder)}
                                        disabled={isProcessing(folder._id)}
                                    >
                                        <Clock className={`w-4 h-4 ${getButtonState(folder._id, 'recovering') ? 'animate-spin' : ''}`} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        title="Delete forever"
                                        onClick={() => handleDeleteClick(folder)}
                                        disabled={isProcessing(folder._id)}
                                    >
                                        <Trash2 className={`w-4 h-4 ${getButtonState(folder._id, 'deleting') ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Flipbooks isLoading={isLoading} flipbooks={flipbooks} setFlipbooks={setFlipbooks} isSidebarOpen={isSidebarOpen} isTrash={true} view={'trash'} />

            <ConfirmationDialog
                isConfirmModalOpen={isDeleteModalOpen}
                setIsConfirmModalOpen={setIsDeleteModalOpen}
                title="Delete Folder Permanently"
                description={`Are you sure you want to permanently delete the folder "${selectedFolder?.name}"? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                isLoading={isProcessing(selectedFolder?._id)}
                confirmText="Delete Forever"
                cancelText="Cancel"
            />
        </>
    );
}