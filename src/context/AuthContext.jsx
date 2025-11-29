import { GetUserInfoApi, GetPermissionInfoApi } from '@/service/auth.service';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    login: async () => { },
    logout: () => { },
    checkAuth: async () => false,
    userMeta: null,
    permissions: null,
    updateUserMeta: () => { },
    isWorkspaceExpired: false,
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userMeta, setUserMeta] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [isWorkspaceExpired, setIsWorkspaceExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const checkWorkspaceExpiration = (user) => {
        const currentWorkspaceId = localStorage.getItem('fd_workspace_id') || user.workspaceId;
        const workspaceInfo = user.workspaceInfo?.find(ws => ws.workspaceId === currentWorkspaceId);
        return workspaceInfo?.isExpired || false;
    };

    const isTokenVerified = async (token) => {
        if (!token) return false;
        try {
            const response = await GetUserInfoApi(token);
            if (response.status !== 200) return false;
            setUserMeta(response.data.user);
            const fd_workspace_id = localStorage.getItem('fd_workspace_id');
            if (!fd_workspace_id) {
                localStorage.setItem('fd_workspace_id', response.data.user.workspaceId);
            }
            const session_id = sessionStorage.getItem('session_id');
            if (!session_id) {
                sessionStorage.setItem('session_id', uuidv4());
            }
            const expired = checkWorkspaceExpiration(response.data.user);
            setIsWorkspaceExpired(expired);
            return true;
        } catch (error) {
            return false;
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await GetPermissionInfoApi();
            const apiPermissions = response.data.permission
            setPermissions(apiPermissions);
        } catch (error) {
            setPermissions(null);
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('fd_access_token');
        if (!token) {
            setIsAuthenticated(false);
            setPermissions(null);
            return false;
        }
        const isValidToken = await isTokenVerified(token);
        setIsAuthenticated(isValidToken);
        if (isValidToken) {
            await fetchPermissions();
        } else {
            setPermissions(null);
        }
        return isValidToken;
    };

    const login = async (data) => {
        localStorage.setItem('fd_access_token', data.token);
        localStorage.removeItem('fd_confirm_token');
        const isValid = await isTokenVerified(data.token);
        if (isValid) {
            await fetchPermissions();
            setIsAuthenticated(true);
            return true;
        } else {
            localStorage.removeItem('fd_access_token');
            return false;
        }
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUserMeta(null);
        setPermissions(null);
        navigate('/auth/sign-in');
    };

    const updateUserMeta = (newUserMeta) => {
        setUserMeta(newUserMeta);
        const expired = checkWorkspaceExpiration(newUserMeta);
        setIsWorkspaceExpired(expired);
    };

    const refreshUserInfo = async () => {
        const token = localStorage.getItem('fd_access_token');
        if (!token) return false;

        try {
            const response = await GetUserInfoApi(token);
            if (response.status !== 200) return false;

            setUserMeta(response.data.user);
            const expired = checkWorkspaceExpiration(response.data.user);
            setIsWorkspaceExpired(expired);

            if (expired) {
                navigate('/expire');
            }

            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            login,
            logout,
            checkAuth,
            userMeta,
            permissions,
            updateUserMeta,
            setPermissions,
            isWorkspaceExpired,
            refreshUserInfo
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);