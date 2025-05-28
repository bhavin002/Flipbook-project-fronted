import { createContext, useContext, useState, useEffect } from 'react';
import { GetWorkspaceFlipbooksApi, GetWorkspaceTemplatesApi, GetFlipbooksApi } from '@/service/flipbook.service';
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
                response = await GetFlipbooksApi(filters);
            } else {
                response = isTemplateView 
                    ? await GetWorkspaceTemplatesApi() 
                    : await GetWorkspaceFlipbooksApi();
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
        fetchFlipbooks();
    }, [location.pathname]);

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