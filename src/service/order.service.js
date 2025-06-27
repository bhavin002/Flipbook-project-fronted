import ApiClient from "@/utils/ApiClient"

export const CreateOrderApi = async (data) => {
    const response = await ApiClient().post("/order/create", data);
    return response.data;
}
