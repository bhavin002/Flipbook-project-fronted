import ApiClient from "@/utils/ApiClient"


export const GetTeammatesApi = async () => {
    const response = await ApiClient().get("/teammate/members");
    return response.data;
}

export const AddTeammateApi = async (data) => {
    const response = await ApiClient().post("/teammate/members/add", data);
    return response.data;
}

export const ResendTeammaterTokenApi = async (teammateId) => {
    const response = await ApiClient().get(`/teammate/members/resend-token/${teammateId}`);
    return response.data;
}

export const UpdateTeammateRoleApi = async (data) => {
    const response = await ApiClient().put(`/teammate/members/update-role`, data);
    return response.data;
}

export const DeleteTeammatesApi = async (data) => {
    const response = await ApiClient().post("/teammate/members/delete", data);
    return response.data;
}

export const GetWorkspaceReadersApi = async () => {
    const response = await ApiClient().get("/workspace-reader/get");
    return response.data;
}