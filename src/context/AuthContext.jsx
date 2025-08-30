import { GetUserInfoApi, GetPermissionInfoApi } from '@/service/auth.service';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    login: async () => { },
    logout: () => { },
    checkAuth: async () => false,
    userMeta: null,
    permissions: null,
    updateUserMeta: () => { },
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userMeta, setUserMeta] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const isTokenVerified = async (token) => {
        if (!token) return false;
        try {
            const response = await GetUserInfoApi(token);
            if (response.status !== 200) return false;
            setUserMeta(response.data.user);
            const fn_workspace_id = sessionStorage.getItem('fn_workspace_id');
            if (!fn_workspace_id) {
                sessionStorage.setItem('fn_workspace_id', response.data.user.workspaceId);
            }
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
        const token = localStorage.getItem('fn_access_token');
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
        localStorage.setItem('fn_access_token', data.token);
        localStorage.removeItem('fn_confirm_token');
        const isValid = await isTokenVerified(data.token);
        if (isValid) {
            await fetchPermissions();
            setIsAuthenticated(true);
            return true;
        } else {
            localStorage.removeItem('fn_access_token');
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
            setPermissions 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);