import ApiClient from "@/utils/ApiClient"

export const updateShopSettingApi = async (flipbookId, data) => {
    const response = await ApiClient().put(`/flipbook-shop-setting/update/${flipbookId}`, data);
    return response.data;
}

export const getShopSettingApi = async (flipbookId) => {
    const response = await ApiClient().get(`/flipbook-shop-setting/get/${flipbookId}`);
    return response.data;
}