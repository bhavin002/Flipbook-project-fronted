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