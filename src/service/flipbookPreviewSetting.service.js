import ApiClient from "@/utils/ApiClient";

export const GetFlipbookPreviewSettingApi = async () => {
    const response = await ApiClient().get(`/flipbook-preview-setting/get-workspace-field`,{
        showLoader: true
    });
    return response.data;
}