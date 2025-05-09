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

export const UpdateFlipbookNameApi = async (flipbookId, data) => {
    const response = await ApiClient().post(`/flipbook/rename-flipbook/${flipbookId}`, data);
    return response.data;
}

export const UpdateFlipbookPageDataApi = async (flipbookId, data) => {
    const response = await ApiClient().put(`/flipbook/edit/${flipbookId}`, data);
    return response.data;
}

export const GetFlipbooksApi = async () => {
    const response = await ApiClient().post("/flipbook/get-flipbook");
    return response.data;
}