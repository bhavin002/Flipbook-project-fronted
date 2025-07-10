import ApiClient from "@/utils/ApiClient";

export const PublishFlipbookApi = async (data) => {
    const response = await ApiClient().post("/flipbook-publish/publish", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const GetFlipbookPublishInfoApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-book-details/${flipbookId}`);
    return response.data;
}

export const UpdatePublishFlipbookApi = async (data) => {
    const response = await ApiClient().post(`/flipbook-publish/update-publish-details`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const UpdateFlipbookViewCountApi = async (flipbookId, data) => {
    const response = await ApiClient().post(`/flipbook-publish/update-view-count/${flipbookId}`, data);
    return response.data
}

export const GetConfigApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-config/${flipbookId}`);
    return response.data;
}

export const GetPublishFlipbookApi = async (flipbookId, token, loader = true) => {
    const url = token ? `/flipbook-publish/get-book/${flipbookId}?token=${token}` : `/flipbook-publish/get-book/${flipbookId}`;
    const response = await ApiClient().get(url, {
        showLoader: loader
    });
    return response.data;
}

export const VerifyFlipbookPasswordApi = async (data) => {
    const response = await ApiClient().post(`/flipbook-publish/verify-password`, data);
    return response.data;
}

export const GetFlipbookStatisticsApi = async (flipbookId, data) => {
    const response = await ApiClient().post(`/flipbook-publish/get-statistics/${flipbookId}`, data);
    return response.data;
}

export const GetFlipbookDetailsApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-book-details/${flipbookId}`);
    return response.data;
}

export const UpdateFlipbookDetailsApi = async (data) => {
    const response = await ApiClient().post(`/flipbook-publish/update-quick-details`, data);
    return response.data;
}