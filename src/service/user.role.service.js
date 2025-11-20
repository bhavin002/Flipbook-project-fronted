import ApiClient from "@/utils/ApiClient"

export const GetUserRolesApi = async () => {
    const response = await ApiClient().get(`/user-role/get`);
    return response.data;
}