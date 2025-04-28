import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/loader';

export function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    console.log("isAuthenticated ??", isAuthenticated)
    const location = useLocation();

    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
    }

    return children;
}
