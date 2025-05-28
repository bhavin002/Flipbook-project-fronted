import ApiClient from "@/utils/ApiClient";

export const PublishFlipbookApi = async (data) => {
    const response = await ApiClient().post("/flipbook-publish/publish", data);
    return response.data;
}

export const GetFlipbookPublishInfoApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-publish/get-book-details/${flipbookId}`);
    return response.data;
}

export const UpdatePublishFlipbookApi = async (data) => {
    const response = await ApiClient().post(`/flipbook-publish/update-publish-details`, data);
    return response.data;
}