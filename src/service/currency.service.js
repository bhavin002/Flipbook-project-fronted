import ApiClient from "@/utils/ApiClient"

export const GetCurrencyApi = async () => {
    const response = await ApiClient().get("/currency/get");
    return response.data;
}