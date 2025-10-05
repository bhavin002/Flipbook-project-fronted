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
    console.log("document.referrer in GetPublishFlipbookApi:", document.referrer);
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

export const GetWorkspaceFlipbookStatisticsApi = async (data) => {
    const response = await ApiClient().post(`/flipbook-publish/get-workspace-statistics`, data);
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

export const GetWorkspaceBookApi = async (id) => {
    const response = await ApiClient().get(`/flipbook-publish/get-workspace-book/${id}`);
    return response.data;
}

export const GetFlipbookThumbnailsApi = async (id) => {
    const response = await ApiClient().get(`/flipbook-publish/get-thumbnails/${id}`);
    return response.data;
}

export const CancelDraftFlipbookApi = async (flipbookId) => {
    const response = await ApiClient().delete(`/flipbook-publish/cancel-draft-flipbook/${flipbookId}`);
    return response.data;
}

export const GetPublicFlipbookApi = async (workspaceId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-public-flipbook/${workspaceId}`);
    return response.data;
}

export const GetPublicFlipbookForBookshelfApi = async (workspaceId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-public-flipbook-for-bookshelf/${workspaceId}`);
    return response.data;
}

export const GetSharedFlipbooksApi = async () => {
    const response = await ApiClient().get(`/flipbook-publish/shared-with-me`);
    return response.data;
}
