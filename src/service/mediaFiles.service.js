import ApiClient from "@/utils/ApiClient"

export const UploadMultipleMediaFilesApi = async (folderId, data) => {
    const response = await ApiClient().post(`/media-file/upload/${folderId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const MoveToFolderApi = async (data) => {
    const response = await ApiClient().post("/media-file/move-to-folder", data);
    return response.data;
}

export const CopyMediaFileToWorkspaceApi = async (data) => {
    const response = await ApiClient().post("/media-file/copy-to-workspace", data);
    return response.data;
}

export const DeleteMediaFilesApi = async (data) => {
    const response = await ApiClient().post("/media-file/delete-file", data);
    return response.data;
}

export const GeneratePresignedUrlApi = async (fileId) => {
    const response = await ApiClient().get(`/media-file/generate-presigned-url/${fileId}`);
    return response.data;
}