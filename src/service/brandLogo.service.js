import ApiClient from "@/utils/ApiClient"

export const UploadBrandLogoApi = async (data) => {
    const response = await ApiClient().post("/brand-logo/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const GetBrandLogosApi = async () => {
    const response = await ApiClient().get(`/brand-logo/get`);
    return response.data;
}

export const DeleteBrandLogoApi = async (logoId) => {
    const response = await ApiClient().delete(`/brand-logo/delete/${logoId}`);
    return response.data;
}