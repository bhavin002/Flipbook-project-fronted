import ApiClient from "@/utils/ApiClient";
import { flipbookType } from "@/utils/enum";

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

export const UpdateFlipbookApi = async (flipbookId, data) => {
    const response = await ApiClient().post(`/flipbook/rename-flipbook/${flipbookId}`, data);
    return response.data;
}

export const UpdateFlipbookPageDataApi = async (flipbookId, data) => {
    const response = await ApiClient().put(`/flipbook/edit/${flipbookId}`, data);
    return response.data;
}

export const GetFlipbooksApi = async (data) => {
    const response = await ApiClient().post("/flipbook/get-flipbook", data);
    return response.data;
}

export const GetFolderFlipbooksApi = async (folderId) => {
    const response = await ApiClient().get(`/flipbook/get-folder-flipbook?flipbookType=${flipbookType.FLIPBOOK}&folderId=${folderId}`);
    return response.data;
}

export const SaveFlipbookAsTemplateApi = async (flipbookId, name, description) => {
    const response = await ApiClient().get(`/flipbook/save-as-template/${flipbookId}?name=${name}&description=${description}`);
    return response.data;
}

export const MakeCopyOfFlipbookApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook/copy-flipbook/${flipbookId}`);
    return response.data;
}

export const MoveToTrashFlipbookApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook/move-to-trash/${flipbookId}`);
    return response.data;
}

export const getTrashFlipbooksApi = async () => {
    const response = await ApiClient().get(`/flipbook/get-trash-flipbook`);
    return response.data;
}