import ApiClient from "@/utils/ApiClient";

export const GetPageLayoutsApi = async () => {
    const response = await ApiClient().get("/page-layout/get", {
        showLoader: true
    });
    return response.data;
}

export const CreateFlipbookApi = async (data) => {
    const response = await ApiClient().post("/flipbook/create", data);
    return response.data;
}

export const GetFlipbookApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook/get/${flipbookId}`, {
        showLoader: true
    });
    return response.data;
}