import { useState, useEffect } from 'react';
import { GetFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { useLocation, useParams } from 'react-router-dom';
import ZeroState from '@/utils/ZeroState';
import { useFlipbook } from '@/context/FlipbookContext';

export default function FolderFlipbooks({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const { id: folderId } = useParams();
    const location = useLocation();
    const { flipbooks, setFlipbooks } = useFlipbook();

    const isTemplateView = location.pathname.includes('/template');

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const payload = {   
                    folderId,
                }
                const response = await GetFlipbooksApi(payload);
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