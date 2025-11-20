import ApiClient from "@/utils/ApiClient";

export const GetFlipbookPreviewSettingApi = async () => {
    const response = await ApiClient().get(`/flipbook-preview-setting/get-workspace-field`, {
        showLoader: true
    });
    return response.data;
}

export const UpdateFlipbookPreviewSettingApi = async (flipbookId, data) => {
    const response = await ApiClient().post(`/flipbook-preview-setting/update/${flipbookId}`, data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    });
    return response.data;
}

export const GetFlipbookPreviewSettingByIdApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-preview-setting/get/${flipbookId}`, {
        showLoader: true
    });
    return response.data;
}