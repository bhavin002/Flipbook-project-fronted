import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
    checkAuth: async () => false
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
            // const response = await apiClient().get(`/pdf-chatbot/isvalid-user/${token}`);
            // if (response.status !== 200) return false;
            return true;
        } catch (error) {
            return false;
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('fn_access_token');
        if (!token) {
            setIsAuthenticated(false);
            return false;
        }
        const isValidToken = await isTokenVerified(token);
        setIsAuthenticated(isValidToken);
        return isValidToken;
    };

    const login = (data) => {
        localStorage.setItem('fn_access_token', data.token);
        localStorage.setItem('fn_workspace_id', data.user.workspaceId);
        localStorage.removeItem('fn_confirm_token');
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('fn_access_token');
        setIsAuthenticated(false);
        navigate('/auth/sign-in');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
