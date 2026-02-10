import axios from 'axios';
import { create } from 'zustand';

export const useApiCounterStore = create((set) => ({
    counter: 0,
    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));

export default function ApiClient() {
    const token = localStorage.getItem('fd_access_token');
    const workspaceid = localStorage.getItem('fd_workspace_id');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `${token}` : '',
        workspaceid: workspaceid ? workspaceid : '',
        timezone: timezone || '',
        "X-Custom-Referrer": (window.self !== window.top && document.referrer) ? document.referrer : window.location.href
    };

    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        responseType: 'json',
        headers,
    });

    instance.interceptors.request.use(
        (config) => {
            const showLoader = config.showLoader

            if (showLoader) {
                useApiCounterStore.getState().increment();
            }

            return config;
        },
        (error) => {
            if (error.config?.showLoader) {
                useApiCounterStore.getState().decrement();
            }

            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            const showLoader = response.config.showLoader;

            if (showLoader) {
                useApiCounterStore.getState().decrement();
            }

            return response;
        },
        (error) => {
            if (error.config && error.config.showLoader) {
                useApiCounterStore.getState().decrement();
            }

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