import ApiClient from "@/utils/ApiClient"

export const UploadMultipleMediaFilesApi = async (folderId, data) => {
    const response = await ApiClient().post(`/media-file/upload/${folderId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}