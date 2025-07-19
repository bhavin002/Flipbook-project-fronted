import ApiClient from "@/utils/ApiClient"

export const VerifyReaderTokenApi  = async (token) => {
    const response = await ApiClient().get(`/helper/accept-invitation/${token}`,{
        showLoader: true
    });
    return response.data;
}

export const CheckStatusApi  = async (token) => {
    const response = await ApiClient().get(`/helper/check-status/${token}`,{
        showLoader: true
    });
    return response.data;
}
