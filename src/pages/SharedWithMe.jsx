import { useState, useEffect } from 'react';
import { GetFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import Flipbooks from '@/utils/Flipbooks';
import { useLocation } from 'react-router-dom';
import { flipbookType } from '@/utils/enum';

export default function SharedWithMe({ isSidebarOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const location = useLocation();

    const isTemplateView = location.pathname.includes('/template');

    useEffect(() => {
        const getFlipbooks = async () => {
            try {
                setIsLoading(true);
                const response = isTemplateView ? await GetFlipbooksApi({ type: flipbookType.TEMPLATE }) : await GetFlipbooksApi({ type: flipbookType.FLIPBOOK });
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
    return (
        <Flipbooks isLoading={isLoading} flipbooks={flipbooks} isSidebarOpen={isSidebarOpen} />
    );
}