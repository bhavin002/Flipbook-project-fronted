import { Loader } from '@/components/ui/loader';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function WorkspaceExpirationRoute({ children }) {
    const { isLoading, isWorkspaceExpired } = useAuth();
    const location = useLocation();
    const isExpirePage = location.pathname === '/expire';

    if (isLoading) {
        return <Loader />
    }

    if (isWorkspaceExpired && !isExpirePage) {
        return <Navigate to="/expire" replace />;
    }

    if (!isWorkspaceExpired && isExpirePage) {
        return <Navigate to="/myflipbooks/flipbooks" replace />;
    }

    return children;
}