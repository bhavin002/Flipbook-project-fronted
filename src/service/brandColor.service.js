import ApiClient from "@/utils/ApiClient";

export const createBrandColorApi = async (data) => {
    const response = await ApiClient().post("/brand-color/create", data);
    return response.data;
};

export const updateBrandColorApi = async (colorId, data) => {
    const response = await ApiClient().post(`/brand-color/update/${colorId}`, data);
    return response.data;
};

export const getBrandColorsApi = async () => {
    const response = await ApiClient().get(`/brand-color/get`);
    return response.data;
};

export const deleteBrandColorApi = async (colorId) => {
    const response = await ApiClient().delete(`/brand-color/delete/${colorId}`);
    return response.data;
};
