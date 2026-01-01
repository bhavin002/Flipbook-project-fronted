import AdminTemplates from '@/utils/AdminTemplates';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminTemplatesPage({ isSidebarOpen }) {
    const { userMeta } = useAuth();

    if (userMeta && userMeta.role !== 1) {
        return <Navigate to="/myflipbooks" replace />;
    }

    return (
        <AdminTemplates isSidebarOpen={isSidebarOpen} />
    );
}
