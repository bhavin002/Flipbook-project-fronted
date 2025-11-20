import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/loader';

export function PublicRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Loader />
    }

    if (isAuthenticated) {
        return <Navigate to={location.state?.from?.pathname || '/'} replace />;
    }

    return children;
}