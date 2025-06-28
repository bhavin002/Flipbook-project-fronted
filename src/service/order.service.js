import ApiClient from "@/utils/ApiClient"

export const CreateOrderApi = async (data) => {
    const response = await ApiClient().post("/order/create", data);
    return response.data;
}

export const getOrderDataApi = async (flipbookId) => {
    const response = await ApiClient().get(`/order/get-orders/${flipbookId}`);
    return response.data;
}

export const deleteOrderApi = async (orderId) => {
    const response = await ApiClient().delete(`/order/delete/${orderId}`);
    return response.data;
}
