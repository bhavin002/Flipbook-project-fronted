import ApiClient from "@/utils/ApiClient"

export const getAllPlans = async () => {
    const response = await ApiClient().get(`/subscription-plan/get`);
    return response.data;
}

export const createCheckoutSession = async (planId) => {
    const response = await ApiClient().get(`/stripe/create-checkout-session/${planId}`);
    return response.data;
}