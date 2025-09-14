import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export function WorkspaceExpirationRoute({ children }) {
    const { isAuthenticated, isLoading, isWorkspaceExpired } = useAuth();
    const location = useLocation();

    // Don't check expiration while loading or if not authenticated
    if (isLoading || !isAuthenticated) {
        return children;
    }

    // Allow access to expire page itself
    if (location.pathname === '/expire') {
        return children;
    }

    // Redirect to expire page if workspace is expired
    if (isWorkspaceExpired) {
        return <Navigate to="/expire" replace />;
    }

    return children;
}