import ApiClient from "@/utils/ApiClient"

export const CreateWorkspaceFolderApi = async (data) => {
    const response = await ApiClient().post("/workspace-folder/create", data);
    return response.data;
}

export const GetWorkspaceFoldersApi = async () => {
    const response = await ApiClient().get("/workspace-folder/get-folder");
    return response.data;
}

export const RenameWorkspaceFolderApi = async (folderId, data) => {
    const response = await ApiClient().put(`/workspace-folder/rename/${folderId}`, data);
    return response.data;
}

export const DeleteWorkspaceFolderApi = async (folderId) => {
    const response = await ApiClient().delete(`/workspace-folder/delete/${folderId}`);
    return response.data;
}