import { useState, useEffect } from 'react';
import { GetFolderFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { useLocation, useParams } from 'react-router-dom';
import ZeroState from '@/utils/ZeroState';

export default function FolderFlipbooks({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const { id: folderId } = useParams();
    const location = useLocation();

    const isTemplateView = location.pathname.includes('/template');

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const response = await GetFolderFlipbooksApi(folderId);
                setFlipbooks(response.data);
            } catch (error) {
                toast.error("Flipbook fetch failed", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoading(false);
            }
        }
        getFlipbooks();
    }, [folderId])

    if (flipbooks.length === 0 && !isLoading) {
        return (
            <ZeroState
                title="Folder is empty"
                description="Get started on your first flipbook – just click the button below!"
            />
        );
    }

    return (
        <Flipbooks isLoading={isLoading} flipbooks={flipbooks} isSidebarOpen={isSidebarOpen} setFlipbooks={setFlipbooks} isFolder={true} view={isTemplateView ? 'template' : 'flipbook'} />
    );
}