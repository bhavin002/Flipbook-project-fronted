import { useState, useEffect } from 'react';
import { GetWorkspaceFlipbooksApi, GetWorkspaceTemplatesApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { useLocation } from 'react-router-dom';
import ZeroState from '@/utils/ZeroState';

export default function MyFlipbooks({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const location = useLocation();

    const isTemplateView = location.pathname.includes('/template');

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const response = isTemplateView ? await GetWorkspaceTemplatesApi() : await GetWorkspaceFlipbooksApi();
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
    }, [location.pathname])

    if (flipbooks.length === 0 && !isLoading) {
        return (
            <ZeroState
                title="Folder is empty"
                description="Get started on your first flipbook – just click the button below!"
            />
        );
    }

    return (
        <Flipbooks isLoading={isLoading} flipbooks={flipbooks} isSidebarOpen={isSidebarOpen} setFlipbooks={setFlipbooks} view={isTemplateView ? 'template' : 'flipbook'} />
    );
}