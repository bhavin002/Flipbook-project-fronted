import ApiClient from "@/utils/ApiClient"

export const GetUserRolePermissionsApi = async () => {
    const response = await ApiClient().get(`/user-role-permissions/get`);
    return response.data;
}

export const UpdateUserRolePermissionsApi = async (data) => {
    const response = await ApiClient().post(`/user-role-permissions/update`, data);
    return response.data;
}