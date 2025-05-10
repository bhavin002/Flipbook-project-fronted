import { useState, useEffect } from 'react';
import { GetFolderFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { useParams } from 'react-router-dom';

export default function FolderFlipbooks({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const { id: folderId } = useParams();

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
    return (
        <Flipbooks isLoading={isLoading} flipbooks={flipbooks} isSidebarOpen={isSidebarOpen} />
    );
}