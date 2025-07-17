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

export const GetFlipbookApi = async (flipbookId, loader = true) => {
    const response = await ApiClient().get(`/flipbook/get/${flipbookId}`, {
        showLoader: loader
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

export const GetWorkspaceFlipbooksApi = async () => {
    const response = await ApiClient().get(`/flipbook/get-folder-flipbook?flipbookType=${flipbookType.FLIPBOOK}`);
    return response.data;
}

export const GetWorkspaceTemplatesApi = async () => {
    const response = await ApiClient().get(`/flipbook/get-folder-flipbook?flipbookType=${flipbookType.TEMPLATE}`);
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

export const MoveToTrashFlipbookApi = async (data) => {
    const response = await ApiClient().post(`/flipbook/move-to-trash`, data);
    return response.data;
}

export const getTrashedFlipbooksApi = async () => {
    const response = await ApiClient().get(`/flipbook/get-trash-flipbook`);
    return response.data;
}

export const DeleteFlipbookApi = async (data) => {
    const response = await ApiClient().post(`/flipbook/delete`, data);
    return response.data;
}

export const RecoverFlipbookApi = async (data) => {
    const response = await ApiClient().post(`/flipbook/recover-trash-flipbook`, data);
    return response.data;
}

export const MoveToWorkspaceApi = async (data) => {
    const response = await ApiClient().post("/flipbook/move-to-workspace", data);
    return response.data;
}

export const UploadPdfApi = async (data) => {
    const response = await ApiClient().post("/flipbook/upload-pdf", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}