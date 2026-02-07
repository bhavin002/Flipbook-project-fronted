import ApiClient from "@/utils/ApiClient"

export const SignUpApi = async (data) => {
    const response = await ApiClient().post("/auth/signup", data);
    return response.data;
}

export const ValidateEmailApi = async (token) => {
    const response = await ApiClient().get(`/auth/validate-email/${token}`);
    return response.data;
}

export const VerifyAccountApi = async (data) => {
    const response = await ApiClient().post("/auth/verify-email", data);
    return response.data;
}

export const SignInApi = async (data) => {
    const response = await ApiClient().post("/auth/signin", data);
    return response.data;
}

export const GetUserInfoApi = async (token) => {
    const response = await ApiClient().get(`/auth/get-user-info/${token}`, {
        showLoader: true
    });
    return response.data;
}

export const SendResetLinkApi = async (email) => {
    const response = await ApiClient().get(`/auth/forget-password/${email}`);
    return response.data;
}

export const ForgotPasswordVerifyTokenApi = async (token) => {
    const response = await ApiClient().get(`/auth/forget-password/verify-token/${token}`, {
        showLoader: true
    });
    return response.data;
}

export const ResetPasswordApi = async (data) => {
    const response = await ApiClient().post(`/auth/forget-password/verify-token-password`, data);
    return response.data;
}

export const GetPermissionInfoApi = async () => {
    const response = await ApiClient().get("/auth/get-permission-info", {
        showLoader: true
    });
    return response.data;
}

export const UpdateProfileApi = async (data) => {
    const response = await ApiClient().post("/auth/update-profile", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const GetUsersWithFlipbookCountApi = async (offset = 0) => {
    const response = await ApiClient({ skipLogout: true }).get(`/auth/get-users-with-flipbook-count?offset=${offset}`);
    return response.data;
}