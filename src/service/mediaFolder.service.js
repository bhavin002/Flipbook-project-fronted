import ApiClient from "@/utils/ApiClient"

export const GetMediaFoldersApi = async () => {
    const response = await ApiClient().get("/media-folder/get-personal-items");
    return response.data;
}

export const GetWorkspaceMediaFoldersApi = async () => {
    const response = await ApiClient().get("/media-folder/get-workspace-items");
    return response.data;
}

export const CreateMediaFolderApi = async (data) => {
    const response = await ApiClient().post("/media-folder/create", data);
    return response.data;
}

export const RenameMediaFolderApi = async (folderId, data) => {
    const response = await ApiClient().put(`/media-folder/rename/${folderId}`, data);
    return response.data;
}

export const DeleteMediaFolderApi = async (folderId) => {
    const response = await ApiClient().delete(`/media-folder/delete/${folderId}`);
    return response.data;
}

export const GetMediaInFolderApi = async (folderId) => {
    const response = await ApiClient().get(`/media-folder/get-media/${folderId}`);
    return response.data;
}

export const CopyToWorkspaceApi = async (folderId) => {
    const response = await ApiClient().post("/media-folder/copy-to-workspace", { folderId });
    return response.data;
}