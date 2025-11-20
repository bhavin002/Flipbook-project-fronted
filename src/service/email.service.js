import ApiClient from "@/utils/ApiClient"

export const SendEmailApi = async (data) => {
    const response = await ApiClient().post("/flipbook/share-email", data);
    return response.data;
}