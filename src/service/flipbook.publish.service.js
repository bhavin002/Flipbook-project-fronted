import ApiClient from "@/utils/ApiClient";

export const PublishFlipbookApi = async (data) => {
    const response = await ApiClient().post("/flipbook-publish/publish", data);
    return response.data;
}

