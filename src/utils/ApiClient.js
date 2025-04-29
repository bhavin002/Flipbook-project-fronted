import axios from 'axios';

export default function ApiClient() {
    const token = localStorage.getItem('fn_access_token');
    const workspaceid = sessionStorage.getItem('fn_workspace_id');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `${token}` : '',
        workspaceid: workspaceid ? workspaceid : '' 
    };
    
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        responseType: 'json',
        headers,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
                return Promise.reject({
                    message: error.response.data.message || "Authentication failed. Please log in again.",
                    status: 401
                });
                
            }
            const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong';

            return Promise.reject({
                message: errorMessage,
                status: error.response?.status ?? 500,
                data: error.response?.data
            });
        }
    );

    return instance;
}
