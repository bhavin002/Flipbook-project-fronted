import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/loader';
import { getData } from '@/utils/datas';

export function PermissionRoute({ children, requiredPermission }) {
    const { isAuthenticated, isLoading } = useAuth();

    const permissions = getData("permission");

    const location = useLocation();

    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
    }

    if (requiredPermission && !permissions?.[requiredPermission]) {
        return <Navigate to="/myflipbooks" replace />;
    }

    return children;
}
