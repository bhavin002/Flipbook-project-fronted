import { createContext, useContext, useState, useEffect } from 'react';
import { GetFlipbooksApi } from '@/service/flipbook.service';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const FlipbookContext = createContext();

export function FlipbookProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [flipbooks, setFlipbooks] = useState([]);
    const location = useLocation();
    const isTemplateView = location.pathname.includes('/template');

    const fetchFlipbooks = async (filters = null) => {
        try {
            setIsLoading(true);
            let response;

            if (filters) {
                if (isTemplateView) {
                    filters.type = [1]
                } else {
                    filters.type = [0];
                }
                response = await GetFlipbooksApi(filters);
            } else {
                const payload = {
                    type: isTemplateView ? [1] : [0]
                }
                response = await GetFlipbooksApi(payload);
            }

            setFlipbooks(response.data);
        } catch (error) {
            toast.error("Flipbook fetch failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        
        const shouldFetchFlipbooks = location.pathname === '/myflipbooks/flipbooks' || location.pathname === '/myflipbooks/template';
        
        if (shouldFetchFlipbooks && !location.search.includes('filter=')) {
            fetchFlipbooks();
        }
    }, [location.pathname, isAuthenticated]);

    const value = {
        flipbooks,
        setFlipbooks,
        isLoading,
        fetchFlipbooks,
        isTemplateView
    };

    return (
        <FlipbookContext.Provider value={value}>
            {children}
        </FlipbookContext.Provider>
    );
}

export function useFlipbook() {
    const context = useContext(FlipbookContext);
    if (!context) {
        throw new Error('useFlipbook must be used within a FlipbookProvider');
    }
    return context;
} 