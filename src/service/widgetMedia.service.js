import ApiClient from "@/utils/ApiClient"

export const UploadSingleMediaApi = async (data) => {
    const response = await ApiClient().post("/widget-media/upload/single", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const DeleteSingleMediaApi = async (fileId) => {
    const response = await ApiClient().delete(`/widget-media/delete/${fileId}`);
    return response.data;
}

export const UploadMultipleMediaApi = async (data) => {
    const response = await ApiClient().post("/widget-media/upload/multiple", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}