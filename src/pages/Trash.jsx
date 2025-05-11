import { useState, useEffect } from 'react';
import { getTrashFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';

export default function Trash({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const response = await getTrashFlipbooksApi();
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
    }, [])
    return (
        <Flipbooks isLoading={isLoading} flipbooks={flipbooks} isSidebarOpen={isSidebarOpen} />
    );
}